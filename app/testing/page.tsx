"use client"
import React, { useEffect, useState } from 'react';

const API_KEY = '';
const HEADERS = { 'Authorization': `${API_KEY}` };

interface Team {
    id: number;
    full_name: string;
}

interface Player {
    id: number;
    first_name: string;
    last_name: string;
}

interface Stat {
    games_played: number;
    pts: number;
}

const NBAApp: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [stats, setStats] = useState<Stat | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        const response = await fetch('https://api.balldontlie.io/v1/teams', { headers: HEADERS });
        const data = await response.json();
        setTeams(data.data);
    };

    const fetchTeamStats = async (teamId: number) => {
        setLoading(true);
        setStats(null);
        setPlayers([]);

        const response = await fetch(`https://api.balldontlie.io/v1/teams/${teamId}`, { headers: HEADERS });
        const data = await response.json();
        setStats(data.data[0] || null);
        
        fetchPlayers(teamId);
    };

    const fetchPlayers = async (teamId: number) => {
        const response = await fetch(`https://www.balldontlie.io/api/v1/players?team_ids[]=${teamId}`, { headers: HEADERS });
        const data = await response.json();
        setPlayers(data.data);
        setLoading(false);
    };

    return (
        <div className="container text-center font-sans p-4">
            <h1 className="text-2xl font-bold">NBA Teams</h1>
            <div className="flex flex-wrap justify-center mt-4">
                {teams.map((team) => (
                    <div key={team.id} className="m-2 p-3 border cursor-pointer" onClick={() => fetchTeamStats(team.id)}>
                        {team.full_name}
                    </div>
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {stats && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Team Stats</h2>
                    <p>Games Played: {stats.games_played}</p>
                    <p>Points Per Game: {stats.pts}</p>
                </div>
            )}

            {players.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Players</h2>
                    {players.map((player) => (
                        <div key={player.id} className="flex items-center mt-2">
                            <img
                                src={`https://nba.com/players/headshots/${player.id}.png`}
                                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/50')}
                                alt={player.first_name}
                                className="w-12 h-12 rounded-full mr-2"
                            />
                            <span>{player.first_name} {player.last_name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NBAApp;
