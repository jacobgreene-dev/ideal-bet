import React from 'react';
import * as NBAIcon from 'react-nba-logos';
import { Anek_Latin } from "next/font/google";
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';

const AnekFont = Anek_Latin({ weight: "500", subsets: ["latin"] });

interface LiveGameProps {
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
}

export default function LiveGame({ homeTeam, awayTeam, commenceTime }: LiveGameProps) {
  const team1Abbr = fullNameToAbbreviation[homeTeam];
  const team2Abbr = fullNameToAbbreviation[awayTeam];

  const Team1Icon = NBAIcon[team1Abbr as keyof typeof NBAIcon];
  const Team2Icon = NBAIcon[team2Abbr as keyof typeof NBAIcon];

  if (!Team1Icon || !Team2Icon) return null;

  const gameDate = new Date(commenceTime);
  const now = new Date();

  const isToday = gameDate.toDateString() === now.toDateString();

  const formattedDate = gameDate.toLocaleDateString('en-US', {
    weekday: isToday ? undefined : 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = gameDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York', // EST
  });

  return (
    <div
      className={`bg-[#5b3cc4] rounded-2xl shadow-lg px-6 py-5 flex flex-col justify-center items-center w-full max-w-[250px] min-h-[220px] space-y-3 transition-transform hover:scale-[1.02] ${AnekFont.className}`}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col items-center w-[70px] text-center">
          <Team1Icon size={70} />
          <p className="text-white text-xs mt-1 break-words">{homeTeam}</p>
        </div>

        <div className="flex flex-col items-center px-2 text-center w-[80px]">
          <p className="text-white text-xs font-semibold">{isToday ? 'Today' : formattedDate}</p>
          <p className="text-white text-sm">{formattedTime.toLowerCase()} est</p>
        </div>

        <div className="flex flex-col items-center w-[70px] text-center">
          <Team2Icon size={70} />
          <p className="text-white text-xs mt-1 break-words">{awayTeam}</p>
        </div>
      </div>
    </div>
  );
}
