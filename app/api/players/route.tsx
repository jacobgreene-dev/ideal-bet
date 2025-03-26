// Next.js server-side response utility for API routes
import { NextResponse } from 'next/server';
import { getOrSetCache } from '@/lib/cache';
import { getPlayers } from '@/lib/apiClient.server';
import { PlayerResponse, PlayersAPIResponse } from '@/lib/types/apiTypes';

function reversePlayerName(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    const lastName = parts[0];
    const firstName = parts.slice(1).join(' ');
    return `${firstName} ${lastName}`;
  }
  return name;
}

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
  const season = searchParams.get('season') || '2023-2024';
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

    const filteredPlayersData: PlayerResponse[] = playersData.response.filter(
      (player: PlayerResponse) => player.position && player.position.trim() !== '')
      .map((player: PlayerResponse) => ({
        ...player,
        reversedName: reversePlayerName(player.name),
      }));;
    
    

    console.log('Players Data:', JSON.stringify(filteredPlayersData, null, 2));

    return NextResponse.json({ response: filteredPlayersData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
