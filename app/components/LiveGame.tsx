import React from 'react';

interface LiveGameProps {
  gameNumber: number;
}

export default function LiveGame({ gameNumber }: LiveGameProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white w-full md:w-1/3">
      <p>Live Game {gameNumber}</p>
    </div>
  );
}