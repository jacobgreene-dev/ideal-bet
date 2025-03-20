const API_BASE_URL = 'https://v1.basketball.api-sports.io';
const API_KEY = process.env.API_SPORTS_KEY; // Store your API key in environment variables

interface Team {
    id: number;
    name: string;
    type: string;
    logo: string;
}

interface Player {
    id: number;
    name: string;
    position: string;
    team: Team;
}

interface Game {
    id: number;
    date: string;
    teams: { home: Team; away: Team };
    status: string;
}

async function fetchData<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

    try {
        const response = await fetch(url.toString(), {
            headers: {
                'x-apisports-key': API_KEY || '',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export async function getTeams(): Promise<Team[] | null> {
    return fetchData<Team[]>('teams', { league: '12', season: '2022-2023' }); // NBA league ID & current season
}

export async function getPlayers(teamId: number): Promise<Player[] | null> {
    return fetchData<Player[]>('players', { team: teamId.toString(), season: '2024-2025' });
}

export async function getScheduledGames(): Promise<Game[] | null> {
    return fetchData<Game[]>('games', { league: '12', season: '2024-2025' });
}
