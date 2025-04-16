// app/api/players/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPlayers } from '@/lib/apiClient.server';
import { getOrSetCache } from '@/lib/cache';
import { PlayerResponse } from '@/lib/types/apiTypes';

function reversePlayerName(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    const lastName = parts[0];
    const firstName = parts.slice(1).join(' ');
    return `${firstName} ${lastName}`;
  }
  return name;
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const season = '2024-2025';
    const cacheKey = `all-players-${season}`;

    const allPlayers: PlayerResponse[] = await getOrSetCache(cacheKey, async () => {
      const teamIds = Array.from({ length: 30 }, (_, i) => String(130 + i)); // update if needed
      const results = await Promise.all(
        teamIds.map(async (teamId) => {
          const res = await getPlayers(teamId, season);
          return res.response || [];
        })
      );
      return results.flat().filter((p) => p.position && p.position.trim() !== '');
    });

    const found = allPlayers.find((p) => String(p.id) === id);

    if (!found) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...found,
      reversedName: reversePlayerName(found.name),
    });
  } catch (err) {
    console.error('Error in /api/players/[id]:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
