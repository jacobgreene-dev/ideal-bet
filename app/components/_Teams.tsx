'use client';

import { useEffect, useState } from 'react';
import { TeamResponse } from '@/lib/types/apiTypes';

/**
 * Renders the NBA Teams page with search functionality.
 * Fetches team data from the server and allows client-side filtering by team name.
 */
export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    /**
     * Fetches the list of NBA teams from the server-side API route.
     * Stores the result in component state for rendering and filtering.
     */
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

  // Filters teams based on the current search term (case-insensitive match on team name)
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">NBA Teams</h1>

      {/* Search input for filtering teams by name */}
      <input
        type="text"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mb-6 text-black placeholder-black"
      />

      {/* Teams grid */}
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

      {/* No results message when no teams match the search */}
      {filteredTeams.length === 0 && (
        <p className="container mx-auto max-w-md justify-center text-white mt-4 text-center m-1 p-4 bg-red-500 rounded">
          No teams found matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}
