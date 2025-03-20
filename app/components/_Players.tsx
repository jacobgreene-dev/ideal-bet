'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Player {
  id: number;
  name: string;
  position?: string;
  age?: number;
}

const seasons = ['2022-2023', '2021-2022', '2020-2021', '2019-2020'];

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [season, setSeason] = useState('2022-2023');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      try {
        const response = await fetch(`/api/players?season=${season}`);
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, [season]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">NBA Players - {season}</h1>

      <div className="flex justify-center mb-6">
        <select 
          className="border p-2 rounded-md text-lg bg-sky-500 text-white"
          value={season} 
          onChange={(e) => setSeason(e.target.value)}
        >
          {seasons.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center">Loading players...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <div key={player.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <Link href={`/players/${player.id}`} className="text-blue-700 hover:underline text-lg font-medium block">
              {player.name}
            </Link>
            {player.position && <p className="mt-2 text-sm">Position: {player.position}</p>}
            {player.age && <p className="text-sm">Age: {player.age}</p>}
          </div>
        ))}
      </div>
    </div>
  );
} 