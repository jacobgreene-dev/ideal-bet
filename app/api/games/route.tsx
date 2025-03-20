// app/api/games/route.ts
import { NextResponse } from 'next/server';
import { getScheduledGames } from '@/lib/apiClient.server';

export async function GET() {
    try {
        const games = await getScheduledGames();
        return NextResponse.json(games);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch scheduled games' }, { status: 500 });
    }
}