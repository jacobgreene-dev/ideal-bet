// Next.js server-side response utility for API routes
import { NextResponse } from 'next/server';
import { getOrSetCache } from '@/lib/cache';
import { getTeams } from '@/lib/apiClient.server';
import { TeamsApiResponse, TeamResponse } from '@/lib/types/apiTypes';

/**
 * Handles GET requests to the /api/teams endpoint.
 * Retrieves NBA team data for a given league and season.
 * Utilizes caching to reduce external API calls and improve performance.
 * 
 * @param req - The incoming HTTP request object
 * @returns A JSON response containing filtered team data or an error
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const league = searchParams.get('league') || '12';            // Default to NBA league ID '12'
  const season = searchParams.get('season') || '2022-2023';     // Default season if not provided

  try {
    // Construct a unique cache key based on league and season
    const cacheKey = `teams-${league}-${season}`;

    /**
     * Attempts to retrieve team data from cache.
     * If unavailable or expired, fetches fresh data from the external API.
     */
    const teamsData: TeamsApiResponse = await getOrSetCache(cacheKey, async () => {
      return await getTeams(league, season);
    });

    console.log('Teams Data:', JSON.stringify(teamsData, null, 2));

    /**
     * Filters the API response to include only teams with IDs between 132 and 161.
     */
    const filteredTeams: TeamResponse[] = teamsData.response.filter((team) =>
      team.id >= 132 && team.id <= 161
    );

    return NextResponse.json({ response: filteredTeams });
  
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
