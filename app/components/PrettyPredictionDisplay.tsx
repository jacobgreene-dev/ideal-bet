// @/app/components/PrettyPredictionDisplay.tsx

import { motion } from 'framer-motion';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { TeamCDNLogo } from '@/app/components/TeamCDNLogo';
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';
import { PrettyPredictionProps } from '@/lib/types/frontEndTypes';

const abbreviationToFullName: Record<string, string> = Object.fromEntries(
    Object.entries(fullNameToAbbreviation).map(([full, abbr]) => [abbr, full])
);

export default function PrettyPredictionCard({ prediction, isSaved, onSave }: PrettyPredictionProps) {
    const confidenceColor = {
        High: 'text-red-400',
        Moderate: 'text-yellow-400',
        Negligible: 'text-green-400',
    }[prediction.confidence_level] || 'text-gray-400';

    const pickedTeamAbbr = prediction.user_team === 'home' ? prediction.teams.home : prediction.teams.away;
    const pickedTeamName = abbreviationToFullName[pickedTeamAbbr] || pickedTeamAbbr;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg space-y-6"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Model Prediction</h3>
                <div className="flex items-center gap-2 text-green-400">
                    <AiOutlineCheckCircle size={20} />
                    <span>{prediction.model_recommendation}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-4">
                    <TeamCDNLogo teamName={pickedTeamName} size={40} />
                    <div>
                        <h4 className="text-sm text-gray-400">Your Pick</h4>
                        <p className="text-lg font-bold text-indigo-300">{pickedTeamName}</p>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400">Confidence Level</h4>
                    <p className={`text-lg font-bold ${confidenceColor}`}>{prediction.confidence_level}</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400">Model Probability</h4>
                    <p className="text-lg font-bold text-blue-400">
                        {prediction.model_prob ? (prediction.model_prob * 100).toFixed(1) + '%' : 'N/A'}
                    </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400">Value Edge</h4>
                    <p className="text-lg font-bold text-cyan-400">
                        {typeof prediction.value_edge === 'number' ? prediction.value_edge.toFixed(2) : 'N/A'}
                    </p>
                </div>
            </div>

            <button
                onClick={onSave}
                disabled={isSaved}
                className={`w-full mt-4 ${isSaved ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } text-white font-semibold py-3 rounded-lg transition`}
            >
                {isSaved ? 'Saved' : 'Save Bet Analysis'}
            </button>
        </motion.div>
    );
}