// app/components/PlayerHeadshots.tsx

import Image from 'next/image';
import { playerNameToId } from '@/lib/utils/playerNameMap';
import { PlayerHeadshotProps } from '@/lib/types/frontEndTypes';

export const PlayerHeadshot: React.FC<PlayerHeadshotProps> = ({ playerReversedName, size = 120 }) => {
  const playerId = playerNameToId[playerReversedName];
  const imageSrc = playerId
    ? `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png?imwidth=1040&imheight=760`
    : `https://cdn.nba.com/headshots/nba/latest/1040x760/1.png?imwidth=1040&imheight=760`;

  return (
    <Image
      src={imageSrc}
      alt={playerReversedName}
      width={size}
      height={size}
      className="rounded-full object-cover border shadow"
    />
  );
};
