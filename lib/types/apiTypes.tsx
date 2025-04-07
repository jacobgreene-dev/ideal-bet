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

export interface OnRenderRepsonse {
    bet_type: string,
    teams: {
        home: string,
        away: string
    },
    user_team: string,
    user_odds: number,
    implied_prob: number,
    model_prob: number,
    value_edge: number,
    model_recommendation: string,
    confidence_level: string
}

export interface OnRenderRequest {
    home_avg_pts_last_3: number,
    home_avg_pts_last_5: number,
    home_rest_days: number,
    home_win_streak_last_10: number,
    away_avg_pts_last_3: number,
    away_avg_pts_last_5: number,
    away_rest_days:number,
    away_win_streak_last_10:number,
    form_diff_pts_3:number,
    rest_advantage:number,
    win_streak_diff:number,
    fg_pct_diff_form:number,
    reb_diff_form:number,
    tov_diff_form:number,
    is_home_back_to_back: number,
    is_away_back_to_back: number,
    implied_prob_home: number,
    implied_prob_away: number,
    spread_point: number,
    outcome_point_over: number,
    user_odds: number,
    home_team: string,
    away_team: string,
    user_team: string
}


