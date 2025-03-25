// Next.js server-side response utility for API routes
import { NextResponse } from 'next/server';
import { getOrSetCache } from '@/lib/cache';
import { getPlayers } from '@/lib/apiClient.server';
import { PlayersAPIResponse } from '@/lib/types/apiTypes';

/**
 * Handles GET requests to the /api/players endpoint.
 * Retrieves player data for a specific team and season, with optional search.
 * Utilizes caching to minimize external API calls.
 * 
 * @param req - The incoming HTTP request object
 * @returns A JSON response containing player data or an error
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const team = searchParams.get('team') || '132';
  const season = searchParams.get('season') || '2022-2023';
  const search = searchParams.get('search') || undefined;

  if (!team) {
    return NextResponse.json({ error: 'Team parameter is required' }, { status: 400 });
  }

  try {
    // Construct a unique cache key based on team, season, and search parameters
    const cacheKey = `players-${team}-${season}-${search || 'all'}`;

    /**
     * Attempts to retrieve player data from cache.
     * If unavailable or expired, fetches fresh data from the external API.
     */
    const playersData: PlayersAPIResponse = await getOrSetCache(cacheKey, async () => {
      return await getPlayers(team, season, search);
    });

    console.log('Players Data:', JSON.stringify(playersData, null, 2));

    return NextResponse.json({ response: playersData.response });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
