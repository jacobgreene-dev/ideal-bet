// @/app/components/BetBuilderForm.tsx

'use client';

import React from 'react';
import { BetBuilderFormProps } from '@/lib/types/frontEndTypes';

export function BetBuilderForm({
  selectedGame,
  bookmaker,
  market,
  userTeam,
  step,
  setBookmaker,
  setMarket,
  setUserTeam,
  setStep,
  onAnalyze,
  ready,
}: BetBuilderFormProps) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full h-full flex flex-col justify-between space-y-6">
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        🛠️ Customize your bet analysis!
      </h3>

      {/* Bookmaker picker */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Bookmaker</p>
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
              className={`px-3 py-1.5 rounded-full text-sm border ${
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

      {/* Market picker */}
      {step !== 'game' && (
        <div>
          <p className="text-xs text-gray-400 mb-2">Market</p>
          <div className="flex gap-2">
            {['moneyline', 'spread', 'overunder'].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMarket(m);
                  setUserTeam('');
                  setStep('pick');
                }}
                className={`px-3 py-1.5 rounded-full text-sm border capitalize ${
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

      {/* Pick selector */}
      {step === 'pick' && (
        <div>
          <p className="text-xs text-gray-400 mb-2">
            {market === 'overunder' ? 'Direction' : 'Team'}
          </p>
          <div className="flex gap-2">
            {(market === 'overunder' ? ['over', 'under'] : ['home', 'away']).map((opt) => (
              <button
                key={opt}
                onClick={() => setUserTeam(opt)}
                className={`px-4 py-1.5 rounded-full text-sm border capitalize ${
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
        onClick={onAnalyze}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          ready ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-600 cursor-not-allowed'
        }`}
      >
        Analyze Bet
      </button>
    </div>
  );
}
