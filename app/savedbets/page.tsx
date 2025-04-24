// app/my-bets/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BetCard from '@/app/components/SavedBetCard';
import { SavedBet } from '@/lib/types/apiTypes';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MyBetsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bets, setBets] = useState<SavedBet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return; // wait for session
        if (!session || !session.user?.email) {
            router.push('/login');
            return;
        }

        const fetchBets = async () => {
            try {
                const res = await fetch('/api/userBets/get');
                const data = await res.json();
                setBets(data.bets || []);
            } catch (err) {
                console.error('Failed to fetch saved bets', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBets();
    }, [session, status, router]);

    return (
        <div>
            <Header />
            <div className="min-h-screen pt-24 px-6 bg-gray-900 text-white">
                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : bets.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 p-10 rounded-xl shadow-2xl border border-gray-700 text-center"
                    >
                        <motion.div
                            className="text-6xl sm:text-7xl font-bold text-blue-500 mb-4 animate-bounce"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.3 }}
                        >
                            🧠
                        </motion.div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                            You're One Step Away From Brilliance
                        </h2>
                        <p className="text-gray-300 mb-6 max-w-md">
                            Save your smartest bets here and watch your strategy evolve. Start predicting outcomes and let the data guide you.
                        </p>
                        <Link href="/analysis" className="no-underline">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full font-semibold text-white text-center"
                            >
                                🚀 Go Analyze Now
                            </motion.div>
                        </Link>
                        <div className="absolute -top-10 left-10 animate-ping w-6 h-6 bg-blue-500 rounded-full opacity-75"></div>
                        <div className="absolute -bottom-10 right-10 animate-ping w-6 h-6 bg-purple-500 rounded-full opacity-75"></div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bets.map((bet: SavedBet, index: number) => (
                            <BetCard key={index} bet={bet} index={index} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
