// @/app/analysis/page.tsx
'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { PrettyPredictionCard } from '@/app/components/PrettyPredictionDisplay';
import { BetBuilderForm } from '../components/BetBuilderForm';
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';
import { GameEvent } from '@/lib/types/apiTypes';
import { PredictionResult, PrettyPredictionProps } from '@/lib/types/frontEndTypes';

// Type aliases for props
type PrettyPrediction = PrettyPredictionProps['prediction'];
type Step = 'game' | 'bookmaker' | 'market' | 'pick';

// Animated progress indicator
function StepIndicator({ step }: { step: Step }) {
    const order: Step[] = ['game', 'bookmaker', 'market', 'pick'];
    return (
        <ol className="flex justify-center gap-4 mb-8">
            {order.map((s, i) => {
                const isActive = step === s;
                const isCompleted = order.indexOf(step) > i;
                return (
                    <li key={s} className="flex items-center gap-2">
                        <motion.div
                            initial={false}
                            animate={{
                                scale: isActive ? 1.4 : 1,
                                backgroundColor: isCompleted || isActive ? '#3B82F6' : '#4B5563',
                                boxShadow: isActive ? '0 0 8px rgba(59,130,246,0.6)' : 'none',
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-4 h-4 rounded-full"
                        />
                        <span className="capitalize text-sm hidden sm:inline">{s}</span>
                    </li>
                );
            })}
        </ol>
    );
}

// Card component representing a single NBA game
function GameCard({
    game,
    selected,
    onSelect,
}: {
    game: GameEvent;
    selected: boolean;
    onSelect: (g: GameEvent) => void;
}) {
    const fmt = (n: number | null | undefined) => (n ?? '–');
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelect(game)}
            className={`relative cursor-pointer p-5 rounded-2xl transition shadow-lg border-2 ${selected
                ? 'bg-white text-gray-500 border-blue-500'
                : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                }`}
        >
            <h3 className="text-xl font-semibold mb-1">
                {game.home_team} vs. {game.away_team}
            </h3>
            <p className="text-sm text-sky-300 font-medium">NBA</p>
            <div className='text-md flex '>
                <p className="text-gray-400 grow">
                    Tip-Off:{' '}
                    {new Date(game.commence_time).toLocaleString(undefined, {
                        weekday: 'short',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                        month: 'short',
                        day: 'numeric',
                    })}
                </p>
                <div className='text-gray-400'>
                    <p>ML:&nbsp;{fmt(game.moneyline_home)} / {fmt(game.moneyline_away)}</p>
                    <p>Spread:&nbsp;{fmt(game.spread_point)}</p>
                    <p>Total:&nbsp;{fmt(game.outcome_point_Over)}</p>
                </div>
            </div>

            {/* <div className="absolute inset-0 bg-black/80 opacity-0 hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-1 text-sm">
                <p>ML&nbsp;{fmt(game.moneyline_home)} / {fmt(game.moneyline_away)}</p>
                <p>Spread&nbsp;{fmt(game.spread_point)}</p>
                <p>Total&nbsp;{fmt(game.outcome_point_Over)}</p>
            </div> */}
        </motion.div>
    );
}

export default function AnalysisPage() {
    const { status } = useSession();
    const router = useRouter();

    const [games, setGames] = useState<GameEvent[]>([]);
    const [selectedGame, setSelectedGame] = useState<GameEvent | null>(null);
    const [bookmaker, setBookmaker] = useState('');
    const [market, setMarket] = useState('');
    const [userTeam, setUserTeam] = useState('');
    const [step, setStep] = useState<Step>('game');
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isSaved, setIsSaved] = useState(false);

    // Fetch game data on mount
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch('/api/games');
                const data = await res.json();
                setGames(data.response as GameEvent[]);
            } catch (err) {
                console.error('Error fetching games:', err);
            }
        };
        fetchGames();
    }, []);

    // Reset prediction and saved state on game change
    useEffect(() => {
        setPrediction(null);
        setIsSaved(false);
    }, [selectedGame]);

    // Restore form state after login redirect
    useEffect(() => {
        const stored = sessionStorage.getItem('analysisState');
        if (stored && games.length) {
            try {
                const s = JSON.parse(stored);
                const g = games.find((gm) => gm.id === s.gameId);
                if (g) setSelectedGame(g);
                setBookmaker(s.bookmaker ?? '');
                setMarket(s.market ?? '');
                setUserTeam(s.userTeam ?? '');
                setPrediction(s.prediction ?? null);
                setStep(s.step ?? 'pick');
                sessionStorage.removeItem('analysisState');
                router.replace('/analysis');
            } catch { }
        }
    }, [games, router]);

    const ready = !!(selectedGame && bookmaker && market && userTeam);

    // Submit for prediction from API
    const handleAnalyze = async () => {
        if (!ready || !selectedGame) return;

        const payload = {
            home_team: fullNameToAbbreviation[selectedGame.home_team] ?? selectedGame.home_team,
            away_team: fullNameToAbbreviation[selectedGame.away_team] ?? selectedGame.away_team,
            user_team: userTeam,
            market,
            event_id: selectedGame.id,
            bookmaker,
        };

        try {
            const res = await fetch('/api/onRender', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(await res.text());
            setPrediction(await res.json());
            setIsSaved(false);
        } catch (err) {
            console.error(err);
            alert('Failed to analyze bet.');
        }
    };

    // Save the prediction to user account
    const saveAnalyze = async () => {
        if (!prediction || !selectedGame) return;

        if (status === 'unauthenticated') {
            sessionStorage.setItem(
                'analysisState',
                JSON.stringify({ gameId: selectedGame.id, bookmaker, market, userTeam, prediction, step })
            );
            signIn('google', { callbackUrl: '/analysis' });
            return;
        }

        try {
            const res = await fetch('/api/userBets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gameEvent: {
                        bet_type: market,
                        teams: { home: selectedGame.home_team, away: selectedGame.away_team },
                        user_team: userTeam,
                        model_prob: prediction.model_prob,
                    },
                }),
            });
            if (!res.ok) throw new Error(res.statusText);
            setIsSaved(true);
        } catch (err) {
            console.error(err);
            alert('Could not save bet.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-3">
            <Header />

            {/* Hero */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-10 sm:py-16 px-4 sm:px-8"
            >
                <h1 className="text-4xl sm:text-5xl font-bold mb-3">Analyze Your NBA Bet</h1>
                <h2 className="text-lg text-gray-300">
                    Pick a game, choose a bookmaker &amp; market, then see what the model thinks.
                </h2>
            </motion.section>

            <main className="flex flex-col flex-1 min-h-0">
                <div id="games-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8">
                    {games.map((g) => (
                        <GameCard
                            key={g.id}
                            game={g}
                            selected={selectedGame?.id === g.id}
                            onSelect={(game) => {
                                setSelectedGame(game);
                                setBookmaker('');
                                setMarket('');
                                setUserTeam('');
                                setStep('bookmaker');
                            }}
                        />
                    ))}
                </div>

                <div className="pt-8">
                    <StepIndicator step={step} />
                </div>

                {selectedGame && (
                    <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-0 md:grid md:grid-cols-[1fr_1.65fr] min-h-[520px] gap-4 items-stretch pt-8 pb-12">
                        <BetBuilderForm
                            selectedGame={selectedGame}
                            bookmaker={bookmaker}
                            market={market}
                            userTeam={userTeam}
                            step={step}
                            setBookmaker={setBookmaker}
                            setMarket={setMarket}
                            setUserTeam={setUserTeam}
                            setStep={setStep}
                            onAnalyze={handleAnalyze}
                            ready={ready}
                        />

                        <div className="w-full h-full flex flex-col">
                            <AnimatePresence mode="wait">
                                {prediction ? (
                                    <motion.div
                                        key={prediction?.event_id ? String(prediction.event_id) : 'prediction'}
                                        id="prediction-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full"
                                    >
                                        <PrettyPredictionCard
                                            prediction={prediction as PrettyPrediction}
                                            isSaved={!!isSaved} // Ensure isSaved is a boolean
                                            onSave={saveAnalyze}
                                            reversed
                                        />
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
