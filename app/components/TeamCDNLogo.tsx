// @/app/components/TeamCDNLogo.tsx

import Image from 'next/image';
import { formatTeamNameForCDN } from '@/lib/utils/formatTeamCDN';
import { TeamCDNLogoProps } from '@/lib/types/apiTypes';

export function TeamCDNLogo({ teamName, size = 100 }: TeamCDNLogoProps) {
  const formattedName = formatTeamNameForCDN(teamName);
  const src = `https://i.logocdn.com/nba/2024/${formattedName}.svg`;

  return (
    <div
      className="relative bg-white rounded-full overflow-hidden flex items-center justify-center border shadow"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`${teamName} logo`}
        fill
        className="object-contain p-3"
      />
    </div>
  );
}
