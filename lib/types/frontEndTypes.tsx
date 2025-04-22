export interface PrettyPredictionProps {
    prediction: {
        bet_type: string;
        model_prob: number;
        value_edge: number;
        model_recommendation: string;
        confidence_level: string;
        teams: {
            home: string;
            away: string;
        };
        user_team: string;
    };
    isSaved: boolean;
    onSave: () => void;
}

export interface PredictionResult {
    model_prob: number;
    [key: string]: unknown;
}

export interface PlayerHeadshotProps {
    playerReversedName: string;
    size?: number;
}