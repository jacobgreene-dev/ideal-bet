'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import ChatGPTBetAssistant from '@/app/components/ChatGPTBetAssistant';

export default function ChatGPTAssistantWrapper() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-300px' });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Trigger your animation here
      setHasAnimated(true);
    } else if (!hasAnimated) {
      const timer = setTimeout(() => {
        // Trigger your animation here
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className='pt-20 flex items-center justify-center'
    >
      <div className="flex flex-col md:flex-row gap-10 items-start md:w-1/2 w-full justify-center align-center">

        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI-Powered NBA Assistant
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl">
            Wondering what is going on in the NBA lately? Ask our intelligent NBA betting assistant powered by real-time data and AI models.
            Type in your questions about matchups, games, or players and get instant insights to guide your next move.
          </p>
          <p className="text-sm text-gray-500">
            Free usage is limited. AI predictions are experimental and based on public trends. Please bet responsibly.
          </p>
        </div>

        <div className="md:w-1/2 w-full">
          <ChatGPTBetAssistant />
        </div>
      </div>
    </motion.section>
  );
}