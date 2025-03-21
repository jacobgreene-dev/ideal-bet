'use client';

import { useEffect, useState } from 'react';
import { TeamResponse } from '@/lib/types/apiTypes';

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) throw new Error('Failed to fetch teams');
        const data = await response.json();
        console.log('Fetched Teams:', data.response);
        setTeams(data.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  {/* HTML */ }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NBA Teams</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mb-6 text-black placeholder-black"
      />


      {/* Teams Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="flex flex-col items-center border p-4 rounded-lg shadow-md bg-gray-400"
          >
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-20 h-20 object-contain"
              />
            )}
            <p className="mt-2 font-semibold text-center">{team.name}</p>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredTeams.length === 0 && (
        <p className="container mx-auto max-w-md justify-center text-white mt-4 text-center m-1 p-4 bg-red-500 rounded">
          No teams found matching "{searchTerm}"
        </p>

      )}
    </div>
  );
}
