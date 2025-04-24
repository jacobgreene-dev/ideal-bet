// @/app/components/PrettyPredictionDisplay.tsx

import { motion } from 'framer-motion';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';
import { TeamCDNLogo } from '@/app/components/TeamCDNLogo';
import { fullNameToAbbreviation } from '@/lib/utils/teamNameMap';
import { PrettyPredictionProps } from '@/lib/types/frontEndTypes';
import { Tooltip } from './Tooltip';


const abbreviationToFullName: Record<string, string> = Object.fromEntries(
    Object.entries(fullNameToAbbreviation).map(([full, abbr]) => [abbr, full])
);

export function PrettyPredictionCard({ prediction, isSaved, onSave }: PrettyPredictionProps) {
    const confidenceColor = {
        High: 'text-green-400',
        Moderate: 'text-yellow-400',
        Negligible: 'text-red-400',
    }[prediction.confidence_level] || 'text-gray-400';

    const pickedTeamAbbr = prediction.user_team === 'home' ? prediction.teams.home : prediction.teams.away;
    const opposingTeamAbbr = prediction.user_team === 'home' ? prediction.teams.away : prediction.teams.home;

    const pickedTeamName = abbreviationToFullName[pickedTeamAbbr] || pickedTeamAbbr;
    const opposingTeamName = abbreviationToFullName[opposingTeamAbbr] || opposingTeamAbbr;

    const isPass = prediction.model_recommendation?.toLowerCase() === 'pass';


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl space-y-6 max-w-xl mx-auto"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Bet Analysis</h3>
                <div
                    className={`flex items-center gap-2 ${
                        isPass ? 'text-red-400' : 'text-green-400'
                    }`}
                >
                    {isPass ? (
                        <AiOutlineWarning size={20} />
                    ) : (
                        <AiOutlineCheckCircle size={20} />
                    )}
                    <span className="font-semibold capitalize">{prediction.model_recommendation}</span>
                </div>

            </div>

            {/* Matchup Display */}
            <div className="bg-gray-800 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <TeamCDNLogo teamName={pickedTeamName} size={60} />
                    <p className="text-lg font-bold text-indigo-300">{pickedTeamName}</p>
                </div>
                <span className="text-sm text-gray-400">vs</span>
                <div className="flex items-center gap-4">
                    <TeamCDNLogo teamName={opposingTeamName} size={60} />
                    <p className="text-lg font-semibold text-gray-300">{opposingTeamName}</p>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {/* CONFIDENCE */}
                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400 flex items-center gap-1">
                        Confidence&nbsp;
                        <Tooltip content="Reflection of how confident the model is in its calculations vs. random chance">
                            <span className="cursor-help text-cyan-400">ⓘ</span>
                        </Tooltip>
                    </h4>
                    <p className={`text-lg font-bold ${confidenceColor}`}>
                        {prediction.confidence_level ?? 'N/A'}
                    </p>
                </div>

                {/* MODEL PROBABILITY */}
                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400 flex items-center gap-1">
                        Model Probability&nbsp;
                        <Tooltip content="Model-estimated chance (in % terms) that your pick wins.">
                            <span className="cursor-help text-cyan-400">ⓘ</span>
                        </Tooltip>
                    </h4>
                    <p className="text-lg font-bold text-blue-400">
                        {prediction.model_prob ? (prediction.model_prob * 100).toFixed(1) + '%' : 'N/A'}
                    </p>
                </div>

                {/* VALUE EDGE — already had a tooltip, kept for completeness */}
                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400 flex items-center gap-1">
                        Value Edge&nbsp;
                        <Tooltip content="Model chance minus sportsbook-implied chance. Positive = value.">
                            <span className="cursor-help text-cyan-400">ⓘ</span>
                        </Tooltip>
                    </h4>
                    <p className="text-lg font-bold text-cyan-400">
                        {typeof prediction.value_edge === 'number'
                            ? `${prediction.value_edge.toFixed(1)}%`
                            : 'N/A'}
                    </p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl">
                    <h4 className="text-sm text-gray-400">Your Team</h4>
                    <p className="text-lg font-bold text-indigo-300">{pickedTeamName}</p>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={onSave}
                disabled={isSaved}
                className={`w-full mt-2 ${isSaved ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-lg transition`}
            >
                {isSaved ? 'Saved' : 'Save Bet Analysis'}
            </button>
        </motion.div>
    );
}
