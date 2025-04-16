'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TeamResponse } from '@/lib/types/apiTypes';

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-sky-900 text-white px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-10"
      >
        NBA Teams
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="max-w-xl mx-auto mb-10"
      >
        <input
          type="text"
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400 text-white shadow focus:outline-none focus:border-blue-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {filteredTeams.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition"
          >
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-20 h-20 object-contain rounded-full border border-gray-600 bg-white"
              />
            )}
            <p className="font-semibold text-lg text-white">{team.name}</p>

            <div className="flex gap-3 w-full">
              <a
                href={`/teams/${team.id}`}
                className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                Team Stats
              </a>
              <a
                href={`/players?team=${team.id}`}
                className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                View Players
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredTeams.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 bg-red-100 text-red-700 rounded-lg p-6 text-center max-w-md mx-auto shadow"
        >
          No teams found matching "{searchTerm}"
        </motion.p>
      )}
    </div>
  );
}
