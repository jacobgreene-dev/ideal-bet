// @/lib/apiClient.server.tsx

// Imports necessary TypeScript interfaces for type safety and structure
import { TeamsApiResponse, PlayersAPIResponse, GameEvent, PredictionPayload, PredictionResponse } from '@/lib/types/apiTypes';

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
export async function getTeams(league = '12', season = '2024-2025'): Promise<TeamsApiResponse> {
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
export async function getPlayers(team?: string, season = '2024-2025', search?: string): Promise<PlayersAPIResponse> {
  const params: Record<string, string> = { season };
  if (team) params.team = team;
  if (search) params.search = search;

  return fetchData<PlayersAPIResponse>('players', params);
}

/**
 * Fetches scheduled NBA games **with odds** and normalises the payload.
 * Returns one object per event with the first bookmaker’s numbers + a list of all shops.
 */
export async function getOddsScheduledGames(): Promise<GameEvent[]> {
  const url = new URL(`${ODDS_BASE_URL}/sports/basketball_nba/odds`);
  url.searchParams.set('apiKey', ODDS_API_KEY ?? '');
  url.searchParams.set('regions', 'us');
  url.searchParams.set('markets', 'h2h,spreads,totals');
  // You can add `dateFormat=iso` or `bookmakers=draftkings,fanduel` if you want.

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Odds API request failed: ${res.statusText}`);

  type OddsEvent = {
    id: string;
    home_team: string;
    away_team: string;
    commence_time: string;
    bookmakers: {
      key: string;
      markets: {
        key: 'h2h' | 'spreads' | 'totals';
        outcomes: { name: string; price: number; point?: number }[];
      }[];
    }[];
  };

  const oddsEvents: OddsEvent[] = await res.json();

  return oddsEvents.map((evt) => {
    /* grab first bookmaker’s numbers for quick display */
    const firstBook = evt.bookmakers[0];

    // utilities to pull numbers quickly
    const getOutcome = (marketKey: string, team: string | 'over' | 'under') => {
      const mkt = firstBook.markets.find((m) => m.key === marketKey);
      return mkt?.outcomes.find((o) => o.name.toLowerCase() === team.toLowerCase());
    };

    const h2hHome = getOutcome('h2h', evt.home_team);
    const h2hAway = getOutcome('h2h', evt.away_team);
    const spreadHome = getOutcome('spreads', evt.home_team);
    const totalsOver = getOutcome('totals', 'over');

    return {
      id: evt.id,
      home_team: evt.home_team,
      away_team: evt.away_team,
      commence_time: evt.commence_time,
      bookmakers: evt.bookmakers.map((b) => b.key), // dynamic list
      moneyline_home: h2hHome?.price ?? null,
      moneyline_away: h2hAway?.price ?? null,
      spread_point: spreadHome?.point ?? null,
      outcome_point_Over: totalsOver?.point ?? null,
    } as GameEvent;
  });
}

/**
 * 
 *
 * @param eventId - Event ID of the game
 * @returns Array of odds for the specified game
 */
export async function postPredictionRequest(payload: PredictionPayload): Promise<PredictionResponse> {
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
