'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bet } from '@/lib/types/apiTypes';

export default function SavedBetsPreview() {
  const [userBetData, setUserBetData] = useState<Bet | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await fetch('/api/userBets/get');
        const data = await res.json();
        setUserBetData(data);
      } catch (error) {
        console.error('Failed to fetch saved bets:', error);
      }
    };

    fetchBets();
  }, []);

  const recentBets = userBetData?.bets.slice(0, 3) || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-8 max-w-7xl mx-auto text-white"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Your Saved Bets
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          Review your most recent bet predictions powered by AI. Analyze past choices to make better calls going forward.
        </p>
      </div>

      {recentBets.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-6 grid-cols-1">
          {recentBets.map((b, idx) => {
            const bet = b.gameEvent;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.3 }}
                className="md:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-3xl shadow-2xl hover:shadow-indigo-500/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <a href='/savedbets'>
                    <p className="text-sm text-gray-400 mb-1 tracking-wide uppercase font-semibold">
                      {bet.bet_type} Bet
                    </p>
                    <h3 className="text-2xl font-bold text-blue-300">
                      {bet.teams.home} <span className="text-gray-500">vs</span> {bet.teams.away}
                    </h3>
                    <p className="mt-4 text-sm text-white">
                      You picked: <span className="text-indigo-400 font-bold uppercase">{bet.user_team}</span>
                    </p>
                    <p className="text-sm text-green-400 mt-1">
                      Model Probability: {(bet.model_prob * 100).toFixed(1)}%
                    </p>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 mb-6 text-lg">You haven't saved any bets yet. Get started now and let AI assist your decisions.</p>
          <button
            onClick={() => router.push('/analysis')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-xl text-white font-semibold shadow-md transition"
          >
            Go to Bet Analysis
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}