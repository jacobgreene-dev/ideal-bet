'use client';

import Image from 'next/image';
import React from 'react';

interface PlayerHeadshotProps {
  playerName: string;
  size?: number;
}

const PlayerHeadshot: React.FC<PlayerHeadshotProps> = ({ playerName, size = 120 }) => {
  const imageSrc = `/nba_headshots/${playerName}.png`;
  console.log(playerName);
  return (
    <Image
      src={imageSrc}
      alt={playerName}
      width={size}
      height={size}
      className="rounded-full object-cover border shadow"
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/nba_headshots/default.png';
      }}
    />
  );
};

export default PlayerHeadshot;
