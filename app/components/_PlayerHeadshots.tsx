import Image from 'next/image';
import rawPlayerImages from '@/public/nba_players/playersMap.json';

const playerImages: Record<string, string> = rawPlayerImages;

interface PlayerHeadshotProps {
  playerReversedName: string;
  size?: number;
}

const PlayerHeadshot: React.FC<PlayerHeadshotProps> = ({ playerReversedName, size = 120 }) => {
  const playerId = playerImages[playerReversedName];
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

export default PlayerHeadshot;
