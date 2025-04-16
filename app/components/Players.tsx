'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PlayerHeadshot from './PlayerHeadshots';
import { TeamResponse, PlayerResponse } from '@/lib/types/apiTypes';
import { motion } from 'framer-motion';

const decodeHTML = (str: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

export default function PlayersPage() {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamResponse | null>(null);
  const searchParams = useSearchParams();
  const teamIdFromQuery = searchParams.get('team');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        const data = await res.json();
        setTeams(data.response);
        if (teamIdFromQuery) {
          const team = data.response.find((t: TeamResponse) => String(t.id) === teamIdFromQuery);
          if (team) handleTeamClick(team);
        }
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };
    fetchTeams();
  }, [teamIdFromQuery]);

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
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 to-sky-900 text-white flex">
      {/* Sidebar */}
      <div className="w-1/4 p-6 bg-gray-800 border-r border-gray-700 overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">NBA Teams</h2>
        <ul className="space-y-2">
          {teams.map((team) => (
            <motion.li
              key={team.id}
              onClick={() => handleTeamClick(team)}
              whileHover={{ scale: 1.03 }}
              className={`cursor-pointer px-4 py-3 rounded-lg transition text-sm font-medium ${
                selectedTeam?.id === team.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {team.name}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {selectedTeam ? (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-10"
            >
              {selectedTeam.name} Players
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {players.map((player, i) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center text-center shadow hover:shadow-xl transition"
                >
                  <PlayerHeadshot playerReversedName={decodeHTML(player.reversedName)} size={100} />
                  <p className="mt-4 text-white font-semibold text-sm">
                    {decodeHTML(player.reversedName)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {players.length === 0 && (
              <div className="mt-8 p-6 bg-red-100 text-red-700 rounded-lg text-center">
                No players found for {selectedTeam.name}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-semibold mb-4"
            >
              Welcome to the NBA Player Viewer
            </motion.p>
            <p className="text-lg text-gray-300 mb-6">Select a team from the sidebar to view its roster.</p>
            <img src="/icons/basketball.svg" alt="Basketball Icon" className="w-28 h-28 opacity-60" />
          </div>
        )}
      </div>
    </div>
  );
}
