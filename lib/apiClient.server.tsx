// Imports necessary TypeScript interfaces for type safety and structure
import { TeamsApiResponse, PlayersAPIResponse, Game } from '@/lib/types/apiTypes';

// Base URL for the API-Sports basketball endpoint
const API_BASE_URL = 'https://v1.basketball.api-sports.io';

// API key stored securely in environment variables
const API_KEY = process.env.API_SPORTS_KEY;

/**
 * Generic function to fetch data from the API-Sports endpoint.
 * Constructs the full URL with query parameters and sends the request with required headers.
 * 
 * @param endpoint - The API endpoint (e.g., 'teams', 'players', 'games')
 * @param params - Optional query parameters as key-value pairs
 * @returns A promise resolving to the typed response data
 */
async function fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url.toString(), {
    headers: {
      'x-apisports-key': API_KEY || '',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Retrieves team data for the specified league and season.
 * Defaults to NBA league (ID 12) and the 2022-2023 season if no parameters are provided.
 * 
 * @param league - The league ID (default is NBA '12')
 * @param season - The season year (default is '2022-2023')
 * @returns A promise resolving to the full Teams API response
 */
export async function getTeams(league = '12', season = '2022-2023'): Promise<TeamsApiResponse> {
  return fetchData<TeamsApiResponse>('teams', { league, season });
}

/**
 * Retrieves player data for a specific team and season, with optional search by player name.
 * 
 * @param team - The team ID to fetch players for
 * @param season - The season year (default is '2022-2023')
 * @param search - Optional search term to filter players by name
 * @returns A promise resolving to the full Players API response
 */
export async function getPlayers(team?: string, season = '2022-2023', search?: string): Promise<PlayersAPIResponse> {
  const params: Record<string, string> = { season };
  if (team) params.team = team;
  if (search) params.search = search;

  return fetchData<PlayersAPIResponse>('players', params);
}


/**
 * Retrieves the scheduled games for the NBA 2022-2023 season.
 * 
 * @returns A promise resolving to an array of Game objects or null if no data is available
 */
export async function getScheduledGames(): Promise<Game[] | null> {
  return fetchData<Game[]>('games', { league: '12', season: '2022-2023' });
}
