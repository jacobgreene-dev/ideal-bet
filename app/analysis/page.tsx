'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { PrettyPredictionCard } from '@/app/components/PrettyPredictionDisplay';
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';
import { GameEvent } from '@/lib/types/apiTypes';
import { PredictionResult, PrettyPredictionProps } from '@/lib/types/frontEndTypes';

type PrettyPrediction = PrettyPredictionProps['prediction'];
type Step = 'game' | 'bookmaker' | 'market' | 'pick';

/* ──────────────────────────  Step progress bar  ────────────────────────── */
function StepIndicator({ step }: { step: Step }) {
    const order: Step[] = ['game', 'bookmaker', 'market', 'pick'];
    return (
        <ol className="flex justify-center gap-4 mb-8">
            {order.map((s, i) => (
                <li key={s} className="flex items-center gap-1">
                    <div
                        className={`w-4 h-4 rounded-full ${
                            order.indexOf(step) >= i ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                    />
                    <span className="capitalize text-sm hidden sm:inline">{s}</span>
                </li>
            ))}
        </ol>
    );
}
function CardShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-xl mx-auto">      {/* 36 rem wide instead of 32 rem */}
            {children}
        </div>
    );
}

/* ──────────────────────────  Game card with odds  ───────────────────────── */
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
            className={`relative cursor-pointer p-5 rounded-2xl transition shadow-lg border-2 ${
                selected
                    ? 'bg-white text-gray-900 border-blue-500'
                    : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
            }`}
        >
            <h3 className="text-xl font-semibold mb-1">
                {game.home_team} vs. {game.away_team}
            </h3>
            <p className="text-sm text-sky-300 font-medium">NBA</p>
            <p className="text-sm text-gray-400">
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

            {/* Hover overlay with odds */}
            <div className="absolute inset-0 bg-black/80 opacity-0 hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-1 text-sm">
                <p>ML&nbsp;{fmt(game.moneyline_home)} / {fmt(game.moneyline_away)}</p>
                <p>Spread&nbsp;{fmt(game.spread_point)}</p>
                <p>Total&nbsp;{fmt(game.outcome_point_Over)}</p>
            </div>
        </motion.div>
    );
}

/* ──────────────────────────  Pulsing placeholder  ───────────────────────── */
function PredictionSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl
           w-full max-w-lg mx-auto space-y-6"
        />
    );
}

/* ──────────────────────────  Main page  ─────────────────────────────────── */
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

    /* --- fetch games with odds --- */
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

    /* reset prediction when game changes */
    useEffect(() => {
        setPrediction(null);
        setIsSaved(false);
    }, [selectedGame]);

    /* restore state after login */
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
            } catch {}
        }
    }, [games, router]);

    /* scroll to card once ready */
    useEffect(() => {
        if (prediction) {
            document.getElementById('prediction-card')?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [prediction]);

    const ready = !!selectedGame && bookmaker && market && userTeam;

    /* --- handlers --- */
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
        } catch (err) {
            console.error(err);
            alert('Failed to analyze bet.');
        }
    };

    const saveAnalyze = async () => {
        if (!prediction || !selectedGame) return;
        if (status === 'unauthenticated') {
            sessionStorage.setItem(
                'analysisState',
                JSON.stringify({ gameId: selectedGame.id, bookmaker, market, userTeam, prediction, step }),
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

    /* --- render --- */
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-3">
            <Header />

            {/* hero */}
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
            <StepIndicator step={step} />

            {/* game grid */}
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

            {/* side-by-side wizard + prediction */}
            {selectedGame && (
                <div className="grid md:grid-cols-2 gap-8 justify-center px-4 sm:px-8 pt-10 pb-20">
                    {/* wizard column */}
                    {/* ───────────── BET BUILDER CARD ───────────── */}
                    <CardShell>
                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl
           w-full mx-auto space-y-6">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            🛠️ Build Your Bet
                        </h3>

                        {/* Bookmaker picker – segmented buttons */}
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Bookmaker</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedGame.bookmakers?.map((bk) => (
                                    <button
                                        key={bk}
                                        onClick={() => {
                                            setBookmaker(bk);
                                            setMarket('');
                                            setUserTeam('');
                                            setStep('market');
                                        }}
                                        className={`px-3 py-1.5 rounded-full text-sm border
            ${
                                            bookmaker === bk
                                                ? 'bg-blue-600 border-blue-500'
                                                : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                        }`}
                                    >
                                        {bk.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Market picker – segmented buttons */}
                        {step !== 'game' && (
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Market</p>
                                <div className="flex gap-2">
                                    {['moneyline', 'spread', 'overunder'].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => {
                                                setMarket(m);
                                                setUserTeam('');
                                                setStep('pick');
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-sm border capitalize
              ${
                                                market === m
                                                    ? 'bg-blue-600 border-blue-500'
                                                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                            }`}
                                        >
                                            {m === 'overunder' ? 'Over / Under' : m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pick selector – segmented buttons */}
                        {step === 'pick' && (
                            <div>
                                <p className="text-xs text-gray-400 mb-1">
                                    {market === 'overunder' ? 'Direction' : 'Team'}
                                </p>
                                <div className="flex gap-2">
                                    {(market === 'overunder'
                                            ? ['over', 'under']
                                            : ['home', 'away']
                                    ).map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => setUserTeam(opt)}
                                            className={`px-4 py-1.5 rounded-full text-sm border capitalize
              ${
                                                userTeam === opt
                                                    ? 'bg-blue-600 border-blue-500'
                                                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Analyze button */}
                        <button
                            disabled={!ready}
                            onClick={handleAnalyze}
                            className={`w-full py-3 rounded-lg font-semibold transition
      ${ready ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'}`}
                        >
                            Analyze Bet
                        </button>
                    </div>
                    </CardShell>

                    {/* prediction column */}
                    <CardShell>
                    <div className="flex-1 h-full flex min-w-0">
                        {prediction ? (
                            <div id="prediction-card">
                                <PrettyPredictionCard
                                    prediction={prediction as PrettyPrediction}
                                    isSaved={isSaved}
                                    onSave={saveAnalyze}
                                />
                            </div>
                        ) : (
                            <PredictionSkeleton />
                        )}
                    </div>
                    </CardShell>
                </div>
            )}
        </main>
            <Footer />
        </div>
    );
}

