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
    /* ----- look & feel helpers ----- */
    const confidenceColor = {
        High: 'text-green-400',
        Moderate: 'text-yellow-400',
        Negligible: 'text-red-400',
    }[prediction.confidence_level] ?? 'text-gray-400';

    const pickedAbbr = prediction.user_team === 'home' ? prediction.teams.home : prediction.teams.away;
    const oppAbbr    = prediction.user_team === 'home' ? prediction.teams.away : prediction.teams.home;

    const pickedName = abbreviationToFullName[pickedAbbr] ?? pickedAbbr;
    const oppName    = abbreviationToFullName[oppAbbr]    ?? oppAbbr;

    const isPass = prediction.model_recommendation?.toLowerCase() === 'pass';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            /* ⚠️  remove width cap so it can breathe  */
            className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl
           w-full h-full space-y-6"
        >
            {/* ── header row ───────────────────────────────────────────────────── */}
            <div className="flex flex-wrap justify-between items-center gap-y-2">
                <h3 className="text-xl font-semibold">Bet Analysis</h3>
                <div className={`flex items-center gap-1 ${isPass ? 'text-red-400' : 'text-green-400'}`}>
                    {isPass ? <AiOutlineWarning size={18} /> : <AiOutlineCheckCircle size={18} />}
                    <span className="font-medium capitalize">{prediction.model_recommendation}</span>
                </div>
            </div>

            {/* ── matchup strip ────────────────────────────────────────────────── */}
            <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-[40%]">
                    <TeamCDNLogo teamName={pickedName} size={52} />
                    <p className="font-semibold text-indigo-300 truncate">{pickedName}</p>
                </div>
                <span className="text-xs text-gray-400">vs</span>
                <div className="flex items-center gap-3 min-w-[40%]">
                    <TeamCDNLogo teamName={oppName} size={52} />
                    <p className="font-medium text-gray-300 truncate">{oppName}</p>
                </div>
            </div>

            {/* ── metric bar: 4 items in a single row on ≥ sm screens ─────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    {
                        label: 'Confidence',
                        value: prediction.confidence_level ?? 'N/A',
                        color: confidenceColor,
                        tip: 'How certain the model is relative to random chance',
                    },
                    {
                        label: 'Model Prob',
                        value: prediction.model_prob ? (prediction.model_prob * 100).toFixed(1) + '%' : 'N/A',
                        color: 'text-blue-400',
                        tip: 'Model-estimated chance (%) that your pick wins',
                    },
                    {
                        label: 'Value Edge',
                        value:
                            typeof prediction.value_edge === 'number'
                                ? `${prediction.value_edge.toFixed(1)}%`
                                : 'N/A',
                        color: 'text-cyan-400',
                        tip: 'Model probability minus sportsbook-implied probability',
                    },
                    { label: 'Your Pick', value: pickedName, color: 'text-indigo-300', tip: '' },
                ].map(({ label, value, color, tip }) => (
                    <div
                        key={label}
                        className="bg-gray-800 p-3 rounded-xl flex flex-col items-center justify-center min-h-[70px]"
                    >
                        <h4 className="text-xs text-gray-400 flex items-center gap-1">
                            {label}
                            {tip && (
                                <Tooltip content={tip}>
                                    <span className="cursor-help text-cyan-400">ⓘ</span>
                                </Tooltip>
                            )}
                        </h4>
                        <p className={`text-lg font-bold ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* ── save button ──────────────────────────────────────────────────── */}
            <button
                onClick={onSave}
                disabled={isSaved}
                className={`w-full py-2.5 rounded-lg font-semibold transition
          ${isSaved ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {isSaved ? 'Saved' : 'Save Bet Analysis'}
            </button>
        </motion.div>
    );
}
