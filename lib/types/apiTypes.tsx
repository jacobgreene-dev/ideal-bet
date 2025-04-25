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
    errors: unknown[];
    results: number;
    response: TeamResponse[];
}

export interface TeamCDNLogoProps {
    teamName: string;
    size?: number;
  }

export interface PlayersAPIResponse {
    get: string;
    parameters: {
        id?: string;
        team?: string;
        season?: string;
        search?: string
    };
    errors: unknown[];
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
    /* — new, odds-related fields — */
    bookmakers?: string[];          // list of shop keys for the event
    moneyline_home?: number | null; // e.g. -120
    moneyline_away?: number | null; // e.g. +100
    spread_point?: number | null;   // first bookmaker’s home spread line
    outcome_point_Over?: number | null; // totals line (Over)
}

export interface PredictionPayload {
    home_team: string;
    away_team: string;
    user_team: string;
    market: string;
    event_id: string;
    bookmaker: string;
}

export interface PredictionResponse {
    bet_type: string;
    teams: {
      home: string;
      away: string;
    };
    user_team: string;
    model_prob: number;
    value_edge: number;
    model_recommendation: string;
    confidence_level: string;
  }

export interface Bet {
    userID: string; // Firebase UUID
    bets: {
        gameEvent: {
            bet_type: string; // e.g., "moneyline"
            teams: {
                home: string; // Home team
                away: string; // Away team
            };
            user_team: string; // The team the user is betting on
            model_prob: number; // Model probability
        };
    }[];
}

export interface SavedBet {
    gameEvent: {
      bet_type: string;
      teams: {
        home: string;
        away: string;
      };
      user_team: string;
      model_prob: number;
    };
    createdAt: string; // add this if applicable
  }
  
