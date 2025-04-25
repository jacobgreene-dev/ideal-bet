// @/app/information/page.tsx

'use client';

import { motion } from 'framer-motion';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const betTypes = [
  {
    title: 'Money-Line Bet',
    description: 'The simplest form of betting where you pick which team will win the game outright.',
    example: {
      team1: 'Los Angeles Lakers',
      team2: 'Boston Celtics',
      odds1: '-150',
      odds2: '+130',
      explanation: 'A -150 odds means you need to bet $150 to win $100. +130 means a $100 bet wins $130.'
    },
    pros: [
      'Simple and straightforward',
      'No point spread to consider',
      'Good for beginners'
    ],
    cons: [
      'Higher risk for favorites',
      'Lower payouts for favored teams'
    ],
    icon: '💰'
  },
  {
    title: 'Over/Under Bet',
    description: 'Also known as totals betting, you bet on whether the combined score of both teams will be over or under a set number.',
    example: {
      game: 'New York Knicks vs Miami Heat',
      total: '215.5',
      over: '-110',
      under: '-110',
      explanation: 'If you bet over 215.5, you win if the total score is 216 or more. If you bet under, you win if it\'s 215 or less.'
    },
    pros: [
      'Not dependent on who wins',
      'Good for defensive/offensive matchups',
      'Can be combined with other bets'
    ],
    cons: [
      'Requires understanding of team scoring patterns',
      'Can be affected by game pace'
    ],
    icon: '📊'
  },
  {
    title: 'Spread Bet',
    description: 'A bet where the favorite must win by a certain number of points, or the underdog must lose by less than that number.',
    example: {
      team1: 'Golden State Warriors',
      team2: 'Chicago Bulls',
      spread1: '-7.5',
      spread2: '+7.5',
      odds: '-110',
      explanation: 'Warriors must win by 8 or more points to cover the spread. Bulls can lose by 7 or fewer points to cover.'
    },
    pros: [
      'More balanced odds',
      'Can make lopsided games interesting',
      'Higher potential payouts'
    ],
    cons: [
      'More complex than moneyline',
      'Half-point spreads can be tricky'
    ],
    icon: '⚖️'
  }
];

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
          Understanding Sports Betting
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
          Learn about the three main types of team-based sports bets and how to make informed decisions.
        </p>
      </motion.div>

      {/* Bet Types Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {betTypes.map((bet, index) => (
          <motion.div
            key={bet.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className={`mb-16 bg-gray-800 rounded-xl p-8 shadow-xl transition-all duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-2xl`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{bet.icon}</div>
              <h2 className="text-3xl font-bold">{bet.title}</h2>
            </div>

            <p className="text-xl text-gray-300 mb-8">{bet.description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Example</h3>
                <div className="space-y-4">
                  {bet.title === 'Money-Line Bet' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>{bet.example.team1}</span>
                        <span className="text-green-400">{bet.example.odds1}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{bet.example.team2}</span>
                        <span className="text-green-400">{bet.example.odds2}</span>
                      </div>
                    </>
                  )}
                  {bet.title === 'Over/Under Bet' && (
                    <>
                      <div className="text-center">
                        <span className="text-2xl font-bold">{bet.example.game}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Over {bet.example.total}</span>
                        <span className="text-green-400">{bet.example.over}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Under {bet.example.total}</span>
                        <span className="text-green-400">{bet.example.under}</span>
                      </div>
                    </>
                  )}
                  {bet.title === 'Spread Bet' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span>{bet.example.team1}</span>
                        <span className="text-green-400">{bet.example.spread1}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{bet.example.team2}</span>
                        <span className="text-green-400">{bet.example.spread2}</span>
                      </div>
                    </>
                  )}
                  <p className="text-sm text-gray-400 mt-4">{bet.example.explanation}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Pros</h3>
                  <ul className="space-y-2">
                    {bet.pros.map((pro, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Cons</h3>
                  <ul className="space-y-2">
                    {bet.cons.map((con, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-red-400">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
} 