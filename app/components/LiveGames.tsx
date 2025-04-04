'use client';

import React, { useEffect, useState } from 'react';
import LiveGame from './LiveGame';
import { GameEvent } from '@/lib/types/apiTypes';

interface LiveGamesProps {
  numberOfGames: number;
}

export default function LiveGames({ numberOfGames }: LiveGamesProps) {
  const [games, setGames] = useState<GameEvent[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/games');
        const data = await res.json();
        setGames(data.response);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className='bg-gradient-to-r from-black bg-sky-500'>
      <div className='flex items-center justify-between text-white text-3xl font-bold pl-5 pt-5 pb-2'>
        <div className='flex-col items-center'>
          <div className='flex items-center p-4'>
            <h1 className='text-5xl'>Upcoming Games</h1>
          </div>
          <div className='p-4'>
            <button className='bg-sky-500 text-black px-4 py-1 rounded-lg shadow-md hover:bg-sky-900 text-2xl'>
              View All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-8 place-items-center">
          {games.slice(0, numberOfGames).map((game) => (
            <LiveGame
              key={game.id}
              homeTeam={game.home_team}
              awayTeam={game.away_team}
              commenceTime={game.commence_time}
            />
          ))}
        </div>


      </div>
    </div>
  );
}
