// app/api/games/route.ts
import { NextResponse } from 'next/server';
import { getOrSetCache } from '@/lib/cache';
import { getOddsScheduledGames } from '@/lib/apiClient.server';
import { GameEvent } from '@/lib/types/apiTypes';

export async function GET() {
    try {
      const cacheKey = 'nba-odds-games';
  
      const games: GameEvent[] = await getOrSetCache(cacheKey, async () => {
        return await getOddsScheduledGames();
      });
  
      return NextResponse.json({ response: games });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
    }
  }