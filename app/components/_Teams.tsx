'use client';

import { useEffect, useState } from 'react';
import { TeamResponse } from '@/lib/types/apiTypes';
import { Button } from '@headlessui/react';

/**
 * Renders the NBA Teams page with search functionality and a modern design.
 * Fetches team data from the server and allows client-side filtering by team name.
 */
export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        // console.log('Fetched Teams:', data.response);
        setTeams(data.response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-sky-700 to-sky-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">NBA Teams</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-4 w-full max-w-lg text-black placeholder-gray-500"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="flex flex-col items-center bg-white text-gray-800 border rounded-xl shadow p-6 hover:shadow-lg transition space-y-4"
          >
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-20 h-20 object-contain"
              />
            )}
            <p className="font-semibold text-center">{team.name}</p>
            {team.id && (
              <div className="flex w-full gap-4">
                <a
                  href={`/teams/${team.id}`}
                  className="text-center bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 flex-1 min-w-0"
                >
                  Team Statistics
                </a>
                <a
                  href={`/players?team=${team.id}`}
                  className="text-center bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 flex-1 min-w-0"
                >
                  View Players
                </a>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTeams.length === 0 && (
        <p className="mt-12 p-6 bg-red-100 text-red-700 rounded-lg text-center max-w-lg mx-auto">
          No teams found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}
