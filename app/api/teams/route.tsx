import { NextResponse } from 'next/server';
import { getOrSetCache } from '@/lib/cache';
import { getTeams } from '@/lib/apiClient.server';
import { TeamsApiResponse } from '@/lib/types/apiTypes';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const league = searchParams.get('league') || '12';              // NBA default
  const season = searchParams.get('season') || '2022-2023';       // Default season

  try {
    const cacheKey = `teams-${league}-${season}`;

    // If league/season dynamic, call getTeams(league, season), else fetchNBATeams() for default
    const teamsData: TeamsApiResponse = await getOrSetCache(cacheKey, async () => {
      return await getTeams(league, season); // Make sure getTeams exists in apiClient
    });

    return NextResponse.json(teamsData); // Send the cached or fetched data

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
