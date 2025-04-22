// @/app/components/TeamCDNLogo.tsx

import Image from 'next/image';
import { formatTeamNameForCDN } from '@/lib/utils/formatTeamCDN';
import { TeamCDNLogoProps } from '@/lib/types/apiTypes';

export function TeamCDNLogo({ teamName, size = 80 }: TeamCDNLogoProps) {
  const formattedName = formatTeamNameForCDN(teamName);
  const src = `https://i.logocdn.com/nba/2024/${formattedName}.svg`;

  return (
    <Image
      src={src}
      alt={`${teamName} logo`}
      width={size}
      height={size}
      className="rounded"
    />
  );
}
