import React from 'react';
import LiveGame from './LiveGame';

interface LiveGamesProps {
  numberOfGames: number;
}

export default function LiveGames({ numberOfGames }: LiveGamesProps) {
  return (
    <div className="bg-white h-96 flex items-center justify-center">
      <div className="flex flex-wrap w-full">
        {Array.from({ length: numberOfGames }, (_, index) => (
          <LiveGame key={index} gameNumber={index + 1} />
        ))}
      </div>
    </div>
  );
}