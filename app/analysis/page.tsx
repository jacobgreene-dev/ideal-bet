"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { fullNameToAbbreviation } from "@/lib/utils/teamNameMap";

interface Game {
    id: string;
    home_team: string;
    away_team: string;
}

export default function AnalysisPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [userTeam, setUserTeam] = useState("");
    const [market, setMarket] = useState("");
    const [prediction, setPrediction] = useState<any>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch("/api/games");
                const data = await res.json();
                setGames(data.response);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
    }, []);

    const handleAnalyze = async () => {
        if (!selectedGame || !userTeam || !market) {
            alert("Please select a game, user team, and market.");
            return;
        }

        const payload = {
            home_team: fullNameToAbbreviation[selectedGame.home_team] || selectedGame.home_team,
            away_team: fullNameToAbbreviation[selectedGame.away_team] || selectedGame.away_team,
            user_team: userTeam,
            market,
            event_id: selectedGame.id,
            bookmaker: "draftkings",
        };

        try {
            const res = await fetch("/api/onRender", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const result = await res.json();
            setPrediction(result);
        } catch (error) {
            console.error("Error analyzing bet:", error);
            alert("Failed to analyze bet. Please try again later.");
        }
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gradient-to-r from-black via-sky-700 to-sky-500 text-white p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">Bet Analysis</h1>
                    <p className="mb-8 text-center text-lg">Select an NBA game and analyze your bet below.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className={`cursor-pointer p-6 border rounded-xl shadow transition space-y-2 ${selectedGame?.id === game.id
                                        ? "bg-blue-100 text-black border-blue-300"
                                        : "bg-white text-gray-800 hover:shadow-lg"
                                    }`}
                                onClick={() => setSelectedGame(game)}
                            >
                                <h2 className="text-xl font-semibold">
                                    {game.home_team} vs {game.away_team}
                                </h2>
                                <p className="text-sm">Event ID: {game.id}</p>
                            </div>
                        ))}
                    </div>

                    {selectedGame && (
                        <div className="bg-white text-gray-800 p-6 rounded-xl shadow space-y-6">
                            <h2 className="text-2xl font-bold mb-2">Selected Game</h2>
                            <div>
                                <p><strong>Home:</strong> {selectedGame.home_team}</p>
                                <p><strong>Away:</strong> {selectedGame.away_team}</p>
                                <p><strong>Event ID:</strong> {selectedGame.id}</p>
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">Your Team</label>
                                <select
                                    className="p-3 border rounded w-full"
                                    value={userTeam}
                                    onChange={(e) => setUserTeam(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="home">Home</option>
                                    <option value="away">Away</option>
                                    <option value="over">Over</option>
                                    <option value="under">Under</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold">Market</label>
                                <select
                                    className="p-3 border rounded w-full"
                                    value={market}
                                    onChange={(e) => setMarket(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="moneyline">Moneyline</option>
                                    <option value="spread">Spread</option>
                                    <option value="over_under">Over/Under</option>
                                </select>
                            </div>

                            <button
                                className="w-full py-3 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
                                onClick={handleAnalyze}
                            >
                                Analyze Bet
                            </button>
                        </div>
                    )}

                    {prediction && (
                        <div className="mt-8 bg-green-100 text-green-800 p-6 rounded-xl shadow">
                            <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
                            <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
                                {JSON.stringify(prediction, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
