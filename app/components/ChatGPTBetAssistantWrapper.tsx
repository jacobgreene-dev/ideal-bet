'use client';

import { motion } from 'framer-motion';
import ChatGPTBetAssistant from '@/app/components/ChatGPTBetAssistant';

export default function ChatGPTAssistantWrapper() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 sm:px-8 max-w-6xl mx-auto text-white"
    >
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2 w-full">
          <ChatGPTBetAssistant />
        </div>

        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI-Powered NBA Bet Assistant
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Wondering what is going on in the NBA lately? Ask our intelligent NBA betting assistant powered by real-time data and AI models.
            Type in your questions about matchups, games, or players and get instant insights to guide your next move.
          </p>
          <p className="text-sm text-gray-500">
            Free usage is limited. AI predictions are experimental and based on public trends. Please bet responsibly.
          </p>
        </div>
      </div>
    </motion.section>
  );
}