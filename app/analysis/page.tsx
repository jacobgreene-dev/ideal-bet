'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';
import { GameEvent } from '@/lib/types/apiTypes';

interface PredictionResult {
    model_prob: number;
    [key: string]: unknown;
}

export default function AnalysisPage() {
    const { status } = useSession();
    const router = useRouter();
    const [games, setGames] = useState<GameEvent[]>([]);
    const [selectedGame, setSelectedGame] = useState<GameEvent | null>(null);
    const [userTeam, setUserTeam] = useState('');
    const [market, setMarket] = useState('');
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isSaved, setIsSaved] = useState(false);


    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
        }
    }, [status, router]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch('/api/games');
                const data = await res.json();
                setGames(data.response);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, []);

    useEffect(() => {
        setIsSaved(false);
        setPrediction(null);
    }, [selectedGame]);


    const handleAnalyze = async () => {
        if (!selectedGame || !userTeam || !market) {
            alert('Please select a game, user team, and market.');
            return;
        }

        const payload = {
            home_team: fullNameToAbbreviation[selectedGame.home_team] || selectedGame.home_team,
            away_team: fullNameToAbbreviation[selectedGame.away_team] || selectedGame.away_team,
            user_team: userTeam,
            market,
            event_id: selectedGame.id,
        };

        try {
            const res = await fetch('/api/onRender', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const result = await res.json();
            setPrediction(result);
        } catch (error) {
            console.error('Error analyzing bet:', error);
            alert('Failed to analyze bet. Please try again later.');
        }
    };

    const saveAnalyze = async () => {
        if (!selectedGame || !prediction) {
            alert('No prediction available to save.');
            return;
        }

        const savePayload = {
            gameEvent: {
                bet_type: market,
                teams: {
                    home: selectedGame.home_team,
                    away: selectedGame.away_team,
                },
                user_team: userTeam,
                model_prob: prediction.model_prob,
            },
        };

        try {
            const saveRes = await fetch('/api/userBets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(savePayload),
            });

            if (!saveRes.ok) throw new Error(`Failed to save bet: ${saveRes.statusText}`);
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving bet analysis:', error);
            alert('Failed to save bet analysis. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-3">
            <Header />

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16 px-4 sm:px-8"
            >
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">Bet Analysis</h1>
                <p className="text-lg text-gray-300">Choose a scheduled NBA game and predict your bet outcome.</p>
            </motion.section>

            <div className="flex-grow max-w-8xl mx-auto px-auto sm:px-8 grid gap-12 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <motion.div
                            key={game.id}
                            whileHover={{ scale: 1.03 }}
                            className={`cursor-pointer p-5 rounded-2xl transition shadow-lg border-2 ${selectedGame?.id === game.id
                                ? 'bg-white text-gray-900 border-blue-500'
                                : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                }`}
                            onClick={() => setSelectedGame(game)}
                        >
                            <h3 className="text-xl font-semibold">{game.home_team} VS. {game.away_team}</h3>
                            <p className="text-sm text-sky-300 font-medium">{game.sport_title}</p>
                            <p className={`text-sm ${selectedGame?.id === game.id ? 'text-gray-900' : 'text-gray-400'}`}>
                                Tip-Off: {new Date(game.commence_time).toLocaleString(undefined, {
                                    weekday: 'short',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {selectedGame && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-800 rounded-2xl p-8 shadow-xl space-y-6"
                    >
                        <h2 className="text-2xl font-bold">Selected Game</h2>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Home:</strong> {selectedGame.home_team}</p>
                            <p><strong>Away:</strong> {selectedGame.away_team}</p>
                            <p><strong>Event ID:</strong> {selectedGame.id}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Your Team</label>
                                <select
                                    value={userTeam}
                                    onChange={(e) => setUserTeam(e.target.value)}
                                    className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600"
                                >
                                    <option value="">Select</option>
                                    <option value="home">Home</option>
                                    <option value="away">Away</option>
                                    <option value="over">Over</option>
                                    <option value="under">Under</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium">Market</label>
                                <select
                                    value={market}
                                    onChange={(e) => setMarket(e.target.value)}
                                    className="w-full p-3 rounded bg-gray-900 text-white border border-gray-600"
                                >
                                    <option value="">Select</option>
                                    <option value="moneyline">Moneyline</option>
                                    <option value="spread">Spread</option>
                                    <option value="overunder">Over/Under</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Analyze Bet
                        </button>
                    </motion.div>
                )}

                {prediction && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-green-100 text-green-900 p-6 rounded-2xl shadow-lg overflow-auto space-y-4"
                    >
                        <h3 className="text-xl font-bold">Prediction Result</h3>
                        <pre className="whitespace-pre-wrap text-sm">
                            {JSON.stringify(prediction, null, 2)}
                        </pre>
                        <button
                            onClick={saveAnalyze}
                            disabled={isSaved}
                            className={`w-full ${isSaved ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                } text-white font-semibold py-3 rounded-lg transition`}
                        >
                            {isSaved ? 'Saved' : 'Save Bet Analysis'}
                        </button>

                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
}