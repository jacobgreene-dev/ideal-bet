export interface Country {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface TeamResponse {
    id: number;
    name: string;
    nationnal: boolean;
    logo: string | null;
    country: Country;
}

export interface TeamsApiResponse {
    get: string;
    parameters: { name?: string; id?: string };
    errors: any[];
    results: number;
    response: TeamResponse[];
}

export interface Player {
    id: number;
    name: string;
    number?: string;
    country?: string;
    position?: string;
    age?: number;
}

export interface Game {
    id: number;
    date: string;
    teams: { home: TeamResponse; away: TeamResponse };
    status: string;
}
