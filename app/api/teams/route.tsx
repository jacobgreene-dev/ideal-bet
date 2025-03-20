// app/api/teams/route.ts
import { NextResponse } from 'next/server';
import { getTeams } from '@/lib/apiClient';

export async function GET() {
    try {
        const data = await getTeams();

        // Extract only the array of team objects
        const teams = data;

        return NextResponse.json(teams);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }
}
