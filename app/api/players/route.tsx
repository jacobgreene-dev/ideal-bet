// app/api/players/route.ts
import { NextResponse } from 'next/server';
import { getPlayers } from '@/lib/apiClient';

const NBA_TEAM_IDS = Array.from({ length: 30 }, (_, i) => 132 + i); // IDs 132 to 161
const playerCache = new Map<string, any>();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const season = searchParams.get('season') || '2022-2023';

    // Check cache
    if (playerCache.has(season)) {
        console.log('Serving players from cache');
        return NextResponse.json(playerCache.get(season));
    }

    try {
        let allPlayers: any[] = [];

        for (const teamId of NBA_TEAM_IDS) {
            const data = await getPlayers(teamId, season);
            if (data?.response) {
                const filtered = data.response.filter((p: any) => p.id);
                allPlayers = allPlayers.concat(filtered);
            }
        }

        playerCache.set(season, allPlayers); // Cache the result by season
        console.log('Caching players for season:', season);

        return NextResponse.json(allPlayers);
    } catch (error) {
        console.error('Error fetching players:', error);
        return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
    }
} 