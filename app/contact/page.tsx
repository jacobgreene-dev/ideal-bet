'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const teamMembers = [
  {
    name: 'Jacob Greene',
    role: 'Lead Developer',
    image: '/team/jacob.jpg',
    github: 'https://github.com/jacobgreene-dev',
  },
  {
    name: 'Jassy',
    role: 'UI/UX Designer',
    image: '/team/jassy.jpg',
    github: 'https://github.com/Jassy24',
  },
  {
    name: 'George',
    role: 'Backend Developer',
    image: '/team/george.jpg',
    github: 'https://github.com/SvGEO290',
  },
  {
    name: 'Open Position',
    role: 'Data Analyst',
    image: '/team/placeholder.jpg',
    github: '#',
  },
  {
    name: 'Open Position',
    role: 'Frontend Developer',
    image: '/team/placeholder.jpg',
    github: '#',
  },
];

const techStack = [
  { name: 'Next.js', description: 'React framework for production' },
  { name: 'TypeScript', description: 'Typed JavaScript for better development' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  { name: 'NextAuth.js', description: 'Authentication for Next.js' },
  { name: 'Framer Motion', description: 'Animation library for React' },
  { name: 'The Odds API', description: 'Sports betting odds data' },
  { name: 'NBA Stats API', description: 'Basketball statistics' },
  { name: 'OpenWeatherMap', description: 'Weather data integration' },
];

const useCases = [
  {
    title: 'Real-time Odds Analysis',
    description: 'Get instant access to live betting odds from multiple sportsbooks, allowing you to make informed decisions in real-time.',
    icon: '📊',
  },
  {
    title: 'Weather Impact Prediction',
    description: 'Understand how weather conditions affect game outcomes, especially for outdoor sports like football and baseball.',
    icon: '⛅',
  },
  {
    title: 'Historical Performance',
    description: 'Analyze team and player performance over time to identify patterns and trends that influence game outcomes.',
    icon: '📈',
  },
  {
    title: 'Custom Betting Strategies',
    description: 'Create and test your own betting strategies using our comprehensive data and analysis tools.',
    icon: '🎯',
  },
];

const featureSections = [
  {
    title: 'Smart Probability Calculator',
    description: 'Our advanced algorithm combines multiple data points to calculate the most accurate probabilities for game outcomes. Watch how our system analyzes real-time data to provide you with the best betting insights.',
    videoSrc: '/videos/probability-calculator.mp4',
    align: 'left',
  },
  {
    title: 'Live Game Analysis',
    description: 'Experience real-time game analysis with our live tracking system. See how we process live game data, player statistics, and environmental factors to give you an edge in live betting.',
    videoSrc: '/videos/live-analysis.mp4',
    align: 'right',
  },
  {
    title: 'Custom Dashboard',
    description: 'Personalize your betting experience with our customizable dashboard. Track your favorite teams, set up alerts, and monitor your betting history all in one place.',
    videoSrc: '/videos/dashboard.mp4',
    align: 'left',
  },
];

export default function ContactPage() {
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
          About Ideal Bet
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
          A sophisticated sports betting probability calculator that combines real-time odds,
          historical data, and weather conditions to provide accurate predictions.
        </p>
      </motion.div>

      {/* Use Cases Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="py-12 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Feature Sections */}
      {featureSections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
          className={`py-16 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col ${section.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                <p className="text-gray-300 text-lg mb-8">{section.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                  Learn More
                </motion.button>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={`/thumbnails/${(section.videoSrc.split('/').pop() || 'default.jpg').replace('.mp4', '.jpg')}`}
                  >
                    <source src={section.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="py-12 bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                <p className="text-gray-300">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Link href={member.github} target="_blank" rel="noopener noreferrer">
                  <div className="relative w-32 h-32 mx-auto mb-4 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover w-full h-full relative z-10"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-12 bg-gray-800"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
} 