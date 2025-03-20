const API_BASE_URL = 'https://v1.basketball.api-sports.io';
const API_KEY = process.env.API_SPORTS_KEY;

interface Team {
  id: number;
  name: string;
  type: string;
  logo: string;
}

interface Player {
  id: number;
  name: string;
  number?: string;
  country?: string;
  position?: string;
  age?: number;
}

interface Game {
  id: number;
  date: string;
  teams: { home: Team; away: Team };
  status: string;
}

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

export async function getTeams(): Promise<Team[] | null> {
  return fetchData<Team[]>('teams', { league: '12', season: '2022-2023' });
}

interface PlayerApiResponse { response: Player[]; }

export async function getPlayers(teamId?: number, season = '2022-2023'): Promise<PlayerApiResponse> {
  const params: Record<string, string> = { season, league: '12' };
  if (teamId) params.team = teamId.toString();
  return fetchData<PlayerApiResponse>('players', params);
}

export async function getScheduledGames(): Promise<Game[] | null> {
  return fetchData<Game[]>('games', { league: '12', season: '2022-2023' });
} 
