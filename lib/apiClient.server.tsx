// Imports necessary TypeScript interfaces for type safety and structure
import { TeamsApiResponse, PlayersAPIResponse, GameEvent, PredictionPayload } from '@/lib/types/apiTypes';

// Base URLs for the API-Sports and Odds API endpoints
const API_BASE_URL = 'https://v1.basketball.api-sports.io';
const ODDS_BASE_URL = 'https://api.the-odds-api.com/v4';

// API keys stored securely in environment variables
const API_KEY = process.env.API_SPORTS_KEY;
const ODDS_API_KEY = process.env.ODDS_API_KEY;

/**
 * Generic API fetch function for API-Sports endpoints.
 * Appends provided query parameters and attaches required headers.
 *
 * @param endpoint - API endpoint path (e.g., 'teams', 'players')
 * @param params - Optional query parameters
 * @returns Typed response data from the API
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
 * Fetches NBA team data for a given league and season.
 *
 * @param league - League ID (default: NBA '12')
 * @param season - Season string (default: '2022-2023')
 * @returns Full Teams API response
 */
export async function getTeams(league = '12', season = '2022-2023'): Promise<TeamsApiResponse> {
  return fetchData<TeamsApiResponse>('teams', { league, season });
}

/**
 * Fetches player data for a specified team and season.
 * Optionally filters by player name.
 *
 * @param team - Team ID to fetch players for
 * @param season - Season string (default: '2022-2023')
 * @param search - Optional player name search term
 * @returns Full Players API response
 */
export async function getPlayers(team?: string, season = '2022-2023', search?: string): Promise<PlayersAPIResponse> {
  const params: Record<string, string> = { season };
  if (team) params.team = team;
  if (search) params.search = search;

  return fetchData<PlayersAPIResponse>('players', params);
}

/**
 * Fetches scheduled NBA games using the Odds API.
 *
 * @returns Array of scheduled game events
 */
export async function getOddsScheduledGames(): Promise<GameEvent[]> {
  const url = new URL(`${ODDS_BASE_URL}/sports/basketball_nba/events`);
  url.searchParams.set('apiKey', ODDS_API_KEY || '');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Odds API request failed: ${res.statusText}`);
  return await res.json();
}

/**
 * 
 *
 * @param eventId - Event ID of the game
 * @returns Array of odds for the specified game
 */
export async function postPredictionRequest(payload: PredictionPayload): Promise<any> {
  const response = await fetch('https://ideal-bet-model.onrender.com/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Prediction request failed: ${response.statusText}`);
  }

  return await response.json();
}

