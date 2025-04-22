// @/app/components/SavedBetCard.tsx
'use client';

import { ExclamationDiamondFill } from 'react-bootstrap-icons';
import { TeamCDNLogo } from '@/app/components/TeamCDNLogo'
import { SavedBet } from '@/lib/types/apiTypes'

interface BetCardProps {
  bet: SavedBet;
  index: number;
}

export default function BetCard({ bet, index }: BetCardProps) {
  const { home, away } = bet.gameEvent.teams;
  const modelProb = (bet.gameEvent.model_prob * 100).toFixed(1);
  const pickedTeam = bet.gameEvent.user_team === "home" ? home : away;

  const handleDelete = async (indexToDelete: number) => {
    try {
      const res = await fetch("/api/userBets/delete", {
        method: "POST",
        body: JSON.stringify({ index: indexToDelete }),
      });

      if (!res.ok) throw new Error("Failed to delete");

      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  return (
    <div
      key={index}
      className="bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-700 flex flex-col space-y-4"
    >
      <div className="text-center">
        <p className="text-lg font-semibold capitalize text-white">{bet.gameEvent.bet_type}</p>
        <p className="text-sm text-gray-400">Model Confidence</p>
        <p className="text-green-400 font-semibold text-xl">{modelProb}%</p>
      </div>

      <div className="flex items-center justify-between bg-gray-900 rounded-xl px-4 py-3">
        <div className="flex items-center gap-3">
          {home && <TeamCDNLogo teamName={home} />}
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">{home}</span>
            <span className="text-xs text-gray-400">Home</span>
          </div>
        </div>

        <span className="text-sm text-white font-semibold">vs</span>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm text-white font-medium">{away}</span>
            <span className="text-xs text-gray-400">Away</span>
          </div>
          {away && <TeamCDNLogo teamName={away} />}
        </div>
      </div>

      <p className="text-sm text-gray-300">
        Your pick: <span className="text-white font-semibold">{pickedTeam}</span>
      </p>

      <div className='flex'>
        <p className="text-xs text-gray-500 mt-auto grow">
          Saved: {new Date(bet.createdAt).toLocaleString()}
        </p>
        <ExclamationDiamondFill
          size={30}
          onClick={() => handleDelete(index)}
          className="cursor-pointer transition-transform transform hover:scale-125 hover:text-red-500"
        />

      </div>


    </div>
  );
}
