import React from 'react';
import LiveGame from './_LiveGame';
import * as NBAIcon from 'react-nba-logos';
import { FaBasketballBall } from 'react-icons/fa';

type Team = keyof typeof NBAIcon;
interface LiveGamesProps {
  numberOfGames: number;
}


// How will we map a list of games to a list of LiveGame components?
export default function LiveGames({ numberOfGames }: LiveGamesProps) {
  const games: { team1: Team, team2: Team }[] = [
    { team1: 'ATL', team2: 'BOS' },
    { team1: 'BKN', team2: 'CHA' },
    { team1: 'CHI', team2: 'CLE' },
    { team1: 'DAL', team2: 'DEN' },
    { team1: 'DET', team2: 'GSW' },
    { team1: 'HOU', team2: 'IND' },
    { team1: 'LAC', team2: 'LAL' },
    { team1: 'MEM', team2: 'MIA' },
    { team1: 'MIL', team2: 'MIN' },
    { team1: 'NOP', team2: 'NYK' },
    { team1: 'OKC', team2: 'ORL' },
    { team1: 'PHI', team2: 'PHX' },
    { team1: 'POR', team2: 'SAC' },
    { team1: 'SAS', team2: 'TOR' },

    { team1: 'ATL', team2: 'BOS' },
    { team1: 'BKN', team2: 'CHA' },
    { team1: 'CHI', team2: 'CLE' },
    { team1: 'DAL', team2: 'DEN' },
    { team1: 'DET', team2: 'GSW' },
    { team1: 'HOU', team2: 'IND' },
    { team1: 'LAC', team2: 'LAL' },
    { team1: 'MEM', team2: 'MIA' },
    { team1: 'MIL', team2: 'MIN' },
    { team1: 'NOP', team2: 'NYK' },
    { team1: 'OKC', team2: 'ORL' },
    { team1: 'PHI', team2: 'PHX' },
    { team1: 'POR', team2: 'SAC' },
    { team1: 'SAS', team2: 'TOR' },
  ];

  return (
    <div className='bg-gradient-to-r from-black to-affair-800'>
      <div className='flex items-center justify-between text-white text-3xl font-bold pl-5 pt-5 pb-2'>

        <div className='flex-col items-center'>
          <div className='flex items-center p-4'>
            <FaBasketballBall className='mr-2' />
            <h1 className='text-5xl'>Live Games</h1>
          </div>

          <div className='p-4'>
            <button className='bg-affair-500 text-black px-4 py-1 rounded-lg shadow-md hover:bg-affair-600 text-2xl'>
              View All
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pb-8'>
          {games.slice(0, numberOfGames).map((game, index) => (
            <LiveGame key={index} gameNumber={index + 1} team1={game.team1} team2={game.team2} />
          ))}
        </div>
      </div>
    </div>
  );
}