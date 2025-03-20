// app/api/players/route.ts
import { NextResponse } from 'next/server';
import { getPlayers } from '@/lib/apiClient';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('teamId');

    if (!teamId) {
        return NextResponse.json({ error: 'Missing teamId parameter' }, { status: 400 });
    }

    try {
        const players = await getPlayers(Number(teamId));
        return NextResponse.json(players);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
    }
}