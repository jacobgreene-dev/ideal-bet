// Next.js server-side response utility for API routes
import { NextResponse } from 'next/server';

// Imports the in-memory caching utility
import { getOrSetCache } from '@/lib/cache';

// Imports the API client method to fetch teams from the external API
import { getTeams } from '@/lib/apiClient.server';

// Imports the expected response type for type safety
import { TeamsApiResponse, TeamResponse } from '@/lib/types/apiTypes';

/**
 * Handles GET requests to the /api/teams endpoint.
 * Supports optional query parameters for league and season to fetch specific datasets.
 * Utilizes caching to reduce redundant external API calls and improve performance.
 * 
 * @param req - The incoming HTTP request object
 * @returns A JSON response containing team data, either from the cache or freshly fetched
 */
export async function GET(req: Request) {
  // Parse query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const league = searchParams.get('league') || '12';            // Default to NBA league ID '12'
  const season = searchParams.get('season') || '2022-2023';     // Default season if not provided

  try {
    // Construct a unique cache key based on league and season to cache responses per dataset
    const cacheKey = `teams-${league}-${season}`;

    /**
     * Attempt to retrieve the teams data from cache.
     * If not cached or expired, fetch fresh data from the API and store it in cache.
     */
    const teamsData: TeamsApiResponse = await getOrSetCache(cacheKey, async () => {
      return await getTeams(league, season);
    });

    // Respond with the cached or freshly fetched team data
    console.log('Teams Data:', JSON.stringify(teamsData, null, 2));
    const filteredTeams: TeamResponse[] = teamsData.response.filter((team) =>
      team.id >= 132 && team.id <= 161
    );
    return NextResponse.json({response: filteredTeams});
  
  } catch (err) {
    // Log the error and respond with a 500 Internal Server Error status
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
