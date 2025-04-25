'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { Bet } from '@/lib/types/apiTypes';

export default function SavedBetsPreview() {
  const [userBetData, setUserBetData] = useState<Bet | null>(null);
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-300px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    } else if (!hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);

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

  const recentBets = userBetData?.bets.slice(0, 2) || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-20 pt-40 flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row gap-10 items-start md:w-1/2 w-full justify-center align-center">
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Your Saved Bets
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            Review your most recent bet predictions powered by AI. Analyze past choices to make better calls going forward.
          </p>
          {recentBets.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <p className="text-gray-400 mb-4 text-lg">
                What are you waiting for! You haven&apos;t saved any bets yet. Get started now and let AI assist your decisions.
              </p>
              <button
                onClick={() => router.push('/analysis')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3 rounded-xl text-white font-semibold shadow-md transition"
              >
                Go to Bet Analysis
              </button>
            </motion.div>
          )}
        </div>

        {recentBets.length > 0 && (
          <div className="md:w-1/2 w-full space-y-6">
            {recentBets.map((b, idx) => {
              const bet = b.gameEvent;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-3xl shadow-2xl hover:shadow-indigo-500/20 transition-all"
                >
                  <a href="/savedbet">
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
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
}