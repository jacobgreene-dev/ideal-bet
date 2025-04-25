// @/app/helpline/page.tsx

'use client';

import { motion } from 'framer-motion';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const resources = [
  {
    title: 'National Problem Gambling Helpline',
    phone: '1-800-522-4700',
    description: '24/7 confidential support for problem gambling',
    hours: '24/7',
    website: 'https://www.ncpgambling.org/',
    icon: '📞'
  },
  {
    title: 'Gamblers Anonymous',
    phone: '1-855-222-5542',
    description: 'Support groups and meetings for gambling addiction recovery',
    hours: '24/7',
    website: 'https://www.gamblersanonymous.org/',
    icon: '🤝'
  },
  {
    title: 'National Council on Problem Gambling',
    phone: '1-800-522-4700',
    description: 'Resources and information about problem gambling',
    hours: '24/7',
    website: 'https://www.ncpgambling.org/',
    icon: 'ℹ️'
  }
];

const warningSigns = [
  'Gambling with money you cannot afford to lose',
  'Borrowing money to gamble',
  'Gambling to escape problems or relieve stress',
  'Lying to family and friends about gambling',
  'Neglecting work or family responsibilities due to gambling',
  'Chasing losses by gambling more',
  'Feeling restless or irritable when trying to stop gambling'
];

const selfHelpTips = [
  'Set strict time and money limits before gambling',
  'Keep track of your gambling activities',
  'Take regular breaks from gambling',
  'Find alternative activities to replace gambling',
  'Talk to someone you trust about your gambling',
  'Seek professional help if needed',
  'Use self-exclusion tools if available'
];

export default function HelplinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
          Gambling Support & Resources
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
          If you or someone you know is struggling with gambling, help is available. 
          You&rsquo;re not alone in this journey.
        </p>
      </motion.div>

      {/* Emergency Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-red-900 rounded-xl p-8 shadow-xl mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Need Immediate Help?
          </h2>
          <div className="text-center">
            <a 
              href="tel:1-800-522-4700" 
              className="text-4xl font-bold hover:text-red-300 transition-colors duration-300"
            >
              1-800-522-4700
            </a>
            <p className="text-xl mt-4">
              Call the National Problem Gambling Helpline - Available 24/7
            </p>
          </div>
        </motion.div>

        {/* Resources Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-gray-800 rounded-xl p-8 shadow-xl transition-all duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{resource.icon}</div>
                <h3 className="text-2xl font-bold">{resource.title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              <div className="space-y-2">
                <p className="text-green-400 font-semibold">{resource.phone}</p>
                <p className="text-gray-400">Hours: {resource.hours}</p>
                <a 
                  href={resource.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Visit Website
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Warning Signs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-gray-800 rounded-xl p-8 shadow-xl mb-16 transition-all duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">Warning Signs of Problem Gambling</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {warningSigns.map((sign, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-400 mt-1">⚠️</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Self-Help Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gray-800 rounded-xl p-8 shadow-xl transition-all duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">Self-Help Tips</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {selfHelpTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
