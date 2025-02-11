import React from 'react';
import LiveGame from './_LiveGame';

interface LiveGamesProps {
  numberOfGames: number;
}

export default function LiveGames({ numberOfGames }: LiveGamesProps) {
  return (
    <div className='bg-white flex flex-col items-center justify-center text-gray-900 p-4'>
      <h1>Live Games</h1>
      {[...Array(numberOfGames)].map((_, i) => {
        return <LiveGame key={i} gameNumber={i} />;
      })}

    </div>
  );
}