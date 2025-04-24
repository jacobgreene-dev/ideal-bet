import { SavedBet } from "@/lib/types/apiTypes";
import { GameEvent } from "@/lib/types/apiTypes"

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

export interface BetCardProps {
    bet: SavedBet;
    index: number;
}

export type Step = 'game' | 'bookmaker' | 'market' | 'pick';

export interface BetBuilderFormProps {
  selectedGame: GameEvent;
  bookmaker: string;
  market: string;
  userTeam: string;
  step: Step;
  setBookmaker: (b: string) => void;
  setMarket: (m: string) => void;
  setUserTeam: (t: string) => void;
  setStep: (s: Step) => void;
  onAnalyze: () => void;
  ready: boolean;
}
