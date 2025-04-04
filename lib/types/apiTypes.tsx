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
    parameters: {
        id?: string;
        name?: string;
        country_id?: string;
        country?: string;
        league?: string;
        season?: string;
        search?: string
    };
    errors: any[];
    results: number;
    response: TeamResponse[];
}

export interface PlayersAPIResponse {
    get: string;
    parameters: { 
        id?: string; 
        team?: string; 
        season?: string; 
        search?: string 
    };
    errors: any[];
    results: number;
    response: PlayerResponse[];
}

export interface PlayerResponse {
    id: number;
    name: string;
    reversedName: string;
    number?: string;
    country?: string;
    position?: string;
    age?: number;
}

// the odds API response
export interface GameEvent {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string; // ISO string format
    home_team: string;
    away_team: string;
  }
  


