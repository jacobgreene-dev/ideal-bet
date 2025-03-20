import { TeamsApiResponse, TeamResponse, Country, Player, Game } from '@/lib/types/apiTypes';

const API_BASE_URL = 'https://v1.basketball.api-sports.io';
const API_KEY = process.env.API_SPORTS_KEY;

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


export async function getTeams(league = '12', season = '2022-2023'): Promise<TeamsApiResponse> {
  return fetchData<TeamsApiResponse>('teams', { league, season });
}

export async function getPlayers(): Promise<Player[]> {
  return fetchData<Player[]>('players', {league: '12', season: '2022-2023'});
}

export async function getScheduledGames(): Promise<Game[] | null> {
  return fetchData<Game[]>('games', { league: '12', season: '2022-2023' });
} 
