'use client';

import { useEffect, useState } from 'react';

interface Team {
    id: number;
    name: string;
    logo: string;
}

export default function TeamsComponent() {
    const [teams, setTeams] = useState<Team[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await fetch('/api/teams');
                if (!response.ok) {
                    throw new Error('Failed to fetch teams');
                }
                const data = await response.json();
                console.log('Fetched Teams Data:', data);
                const filteredTeams = data.response.filter((team: Team) => team.id >= 132 && team.id <= 161);
                setTeams(filteredTeams); 
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, []);
    

    if (loading) return <p>Loading teams...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!Array.isArray(teams)) return <p>No teams available</p>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {teams.map((team) => (
                <div key={team.id} className="flex flex-col items-center border p-4 rounded-lg shadow-md bg-gray-400">
                    <img src={team.logo} alt={team.name} className="w-20 h-20 object-contain" />
                    <p className="mt-2 font-semibold text-center">{team.name}</p>
                </div>
            ))}
        </div>
    );
} 