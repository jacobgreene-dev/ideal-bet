// @/app/components/ChatGPTBetAssistant.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatTurn {
  prompt: string;
  response: string;
}

export default function ChatGPTBetAssistant() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await res.json();

      setHistory((prev) => [
        { prompt: trimmed, response: data.response || 'No response.' },
        ...prev,
      ]);
    } catch {
      setHistory((prev) => [
        { prompt: trimmed, response: 'Something went wrong.' },
        ...prev,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) handleAsk();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-lg max-w-2xl w-full mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        Ask the AI Assistant
      </h2>
      <p className="text-gray-400 text-center">
        Get NBA betting insights, edge suggestions, or matchup tips.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Recently traded players?"
          className="flex-grow p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-5 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2">
        {history.slice(0, 2).map((turn, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <p className="text-sm text-green-400 font-semibold">AI:</p>
            <p className="text-blue-200 whitespace-pre-line">{turn.response}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}