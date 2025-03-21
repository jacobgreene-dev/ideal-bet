'use client';

import { useEffect, useState } from 'react';
import { TeamResponse, PlayerResponse } from '@/lib/types/apiTypes';

const decodeHTML = (str: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

export default function PlayersPage() {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamResponse | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        const data = await res.json();
        setTeams(data.response);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };
    fetchTeams();
  }, []);

  const handleTeamClick = async (team: TeamResponse) => {
    setSelectedTeam(team);
    try {
      const res = await fetch(`/api/players?team=${team.id}`);
      const data = await res.json();
      setPlayers(data.response);
    } catch (err) {
      console.error('Failed to fetch players:', err);
      setPlayers([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 border-r bg-white p-6 overflow-y-auto max-h-screen shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">NBA Teams</h2>
          <ul className="space-y-2">
            {teams.map((team) => (
              <li
                key={team.id}
                onClick={() => handleTeamClick(team)}
                className={`cursor-pointer px-4 py-3 rounded-lg transition ${
                  selectedTeam?.id === team.id
                    ? 'bg-sky-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                {team.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gradient-to-r from-black bg-sky-500">
          {selectedTeam ? (
            <>
              <h2 className="text-3xl font-bold mb-8 text-white">{selectedTeam.name} Players</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex flex-col items-center bg-white border rounded-xl shadow p-6 hover:shadow-lg transition"
                  >
                    <p className="font-medium text-center">{decodeHTML(player.name)}</p>
                  </div>
                ))}
              </div>

              {players.length === 0 && (
                <p className="mt-8 p-6 bg-red-100 text-red-700 rounded-lg text-center">
                  No players found for {selectedTeam.name}
                </p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-3xl font-semibold mb-4 text-black">Welcome to the NBA Player Viewer</p>
              <p className="text-lg text-black mb-8">Select a team from the sidebar to load player data</p>
              <img src="/icons/basketball.svg" alt="Basketball Icon" className="w-32 h-32 opacity-60" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
