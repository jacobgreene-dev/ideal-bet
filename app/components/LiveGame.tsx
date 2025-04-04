import React from 'react';
import * as NBAIcon from 'react-nba-logos';
import { Anek_Latin } from "next/font/google";
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';

const AnekFont = Anek_Latin({ weight: "500", subsets: ["latin"] });

interface LiveGameProps {
  homeTeam: string;
  awayTeam: string;
}

export default function LiveGame({ homeTeam, awayTeam }: LiveGameProps) {
  const team1Abbr = fullNameToAbbreviation[homeTeam];
  const team2Abbr = fullNameToAbbreviation[awayTeam];
  const Team1Icon = NBAIcon[team1Abbr as keyof typeof NBAIcon];
  const Team2Icon = NBAIcon[team2Abbr as keyof typeof NBAIcon];

  if (!Team1Icon || !Team2Icon) return null;

  return (
    <div className={`bg-transparent flex-col items-center justify-center text-gray-900 p-4 ${AnekFont.className}`}>
      <div className='text-lg font-bold'>
        <h1 className='text-white'>{homeTeam} vs {awayTeam} <span className='text-2xl'>&rarr;</span></h1>
        <div className='flex flex-row items-center justify-center gap-4 bg-gray-200 rounded-xl p-4'>
          <Team1Icon size={100} />
          vs
          <Team2Icon size={100} />
        </div>
      </div>
    </div>
  );
}
