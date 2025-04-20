'use client';

import React, { useEffect, useState } from 'react';
import TeamCDNLogo from './TeamCDNLogo';
import { GameEvent } from '@/lib/types/apiTypes';

export default function LiveGamesRow() {
    const [games, setGames] = useState<GameEvent[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await fetch('/api/games');
                const data = await res.json();

                if (data.error) {
                    setError(data.error);
                    return;
                }

                setGames(data.response || []);
            } catch (error) {
                console.error('Error fetching games:', error);
                setError('Failed to fetch games');
            }
        };

        fetchGames();
    }, []);

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-10 px-6 md:px-12 rounded-2xl shadow-lg space-y-8 pt-xlg">
            <div className="flex items-center justify-between text-white">
                <h2 className="text-3xl font-bold tracking-wide">Live Games</h2>
                <a href="/analysis" className="text-sky-400 hover:underline text-lg font-medium">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.slice(0, 4).map((game) => (
                    <a href='/analysis' key={game.id}>
                        <div
                            key={game.id}
                            className="bg-gray-800 rounded-xl shadow-md px-6 py-6 flex flex-col justify-center items-center transition-transform hover:scale-[1.03] hover:shadow-lg min-h-full"
                        >
                            <div className="flex w-full justify-between items-center">
                                <TeamCard teamName={game.home_team} />
                                <GameInfo time={game.commence_time} />
                                <TeamCard teamName={game.away_team} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

function TeamCard({ teamName }: { teamName: string }) {
    return (
        <div className="flex flex-col items-center w-[70px] text-center">
            <TeamCDNLogo teamName={teamName} size={60} />
            <p className="text-white text-xs mt-2 break-words">{teamName}</p>
        </div>
    );
}

function GameInfo({ time }: { time: string }) {
    const gameDate = new Date(time);
    const now = new Date();
    const isToday = gameDate.toDateString() === now.toDateString();

    const formattedDate = gameDate.toLocaleDateString('en-US', {
        weekday: isToday ? undefined : 'short',
        month: 'short',
        day: 'numeric',
    });

    const formattedTime = gameDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York',
    });

    return (
        <div className="flex flex-col items-center px-4 text-center w-[100px]">
            <p className="text-white text-sm font-semibold">{isToday ? 'Today' : formattedDate}</p>
            <p className="text-gray-400 text-xs">{formattedTime.toLowerCase()} EST</p>
        </div>
    );
}
