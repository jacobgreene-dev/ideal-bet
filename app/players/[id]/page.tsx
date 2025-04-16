// app/player/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PlayerResponse } from '@/lib/types/apiTypes';
import PlayerHeadshot from '@/app/components/PlayerHeadshots';
import { motion } from 'framer-motion';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const decodeHTML = (str: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
};

export default function PlayerDetailPage() {
    const { id } = useParams();
    const [player, setPlayer] = useState<PlayerResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await fetch(`/api/players/${id}`);
                if (!res.ok) throw new Error('Failed to fetch player');
                const data = await res.json();
                setPlayer(data);
            } catch (error) {
                console.error('Error fetching player:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPlayer();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">
                Loading...
            </div>
        );
    }

    if (!player) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-xl">
                Player not found.
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex-grow min-h-screen px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-10 text-center"
                >
                    <PlayerHeadshot
                        playerReversedName={decodeHTML(player.reversedName)}
                        size={150}
                    />
                    <h1 className="text-4xl font-bold mt-6 mb-4">{decodeHTML(player.reversedName)}</h1>
                    <p className="text-lg text-gray-400 mb-8">
                        Detailed stats and information about the player.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 text-left text-sm sm:text-base">
                        <div className="bg-gray-700 p-4 rounded-lg shadow">
                            <p className="text-gray-400">Player ID</p>
                            <p className="font-medium text-white">{player.id}</p>
                        </div>
                        {player.number && (
                            <div className="bg-gray-700 p-4 rounded-lg shadow">
                                <p className="text-gray-400">Jersey Number</p>
                                <p className="font-medium text-white">#{player.number}</p>
                            </div>
                        )}
                        {player.position && (
                            <div className="bg-gray-700 p-4 rounded-lg shadow">
                                <p className="text-gray-400">Position</p>
                                <p className="font-medium text-white">{player.position}</p>
                            </div>
                        )}
                        {player.country && (
                            <div className="bg-gray-700 p-4 rounded-lg shadow">
                                <p className="text-gray-400">Country</p>
                                <p className="font-medium text-white">{player.country}</p>
                            </div>
                        )}
                        {player.age && (
                            <div className="bg-gray-700 p-4 rounded-lg shadow">
                                <p className="text-gray-400">Age</p>
                                <p className="font-medium text-white">{player.age}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
