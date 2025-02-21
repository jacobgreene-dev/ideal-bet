import React from 'react';
import { Anek_Latin } from "next/font/google";
import * as NBAIcon from 'react-nba-logos'; // Import all NBA team logos

const AnekFont = Anek_Latin({ 
  weight:"500",
  subsets:["latin"]
});

interface LiveGameProps {
  gameNumber: number;
  team1: keyof typeof NBAIcon;
  team2: keyof typeof NBAIcon;
};

export default function LiveGame({ gameNumber, team1, team2 }: LiveGameProps) {
  const Team1Icon = NBAIcon[team1];
  const Team2Icon = NBAIcon[team2];

  return (
    // Do we want to return anchors for a page to each game?
    <div className={`bg-transparent flex-col items-center justify-center text-gray-900 p-4 ${AnekFont.className}`}>
      <div className='text-lg font-bold'>
        <a href='#'>
          <h1 className='text-white'>{team1} vs {team2}
            <span className='text-2xl'>&rarr;</span>
          </h1>
        </a>
      <div id="1" className='flex flex-row items-center justify-center gap-4 bg-gray-200 rounded-xl p-4'>
        <Team1Icon size={100}/>
        vs
        <Team2Icon size={100}/>
      </div>
      </div>
    </div>
  );
};