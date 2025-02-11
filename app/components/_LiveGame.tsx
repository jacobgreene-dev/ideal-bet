import React from 'react';
import * as NBAIcon from 'react-nba-logos'; // Import all NBA team logos

interface LiveGameProps {
  gameNumber: number;
}

export default function LiveGame({ gameNumber }: LiveGameProps) {
  return (
    <div className='bg-white flex flex-row items-center justify-center text-gray-900 p-4'>
      <div className='flex flex-col items-center justify-center pr-4'>
        <NBAIcon.BKN width={50} />
        <p>Brooklyn Nets</p>
      </div>
      <div className='flex flex-col items-center justify-center pr-4'>
        <NBAIcon.ATL width={50} />
        <p>Atlanta Hawks</p>
      </div>
      <div className='flex flex-col items-center justify-center pr-4'>
        <NBAIcon.BOS width={50} />
        <p>Boston Celtics</p>
      </div>
    </div>
  );
}