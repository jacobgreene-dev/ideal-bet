'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

import { VscVscode, } from "react-icons/vsc";
import { SiNextdotjs, } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { TbBrandTypescript } from "react-icons/tb";
import { RiTailwindCssFill, RiFirebaseFill, RiVercelFill } from "react-icons/ri";
import { FiFramer } from "react-icons/fi";
import { SiFusionauth, SiGooglecloud, } from "react-icons/si";
import { AiFillApi } from "react-icons/ai";




const techStack = [
  {
    name: 'VS Code',
    description: 'Primary code editor with powerful extensions',
    icon: VscVscode,
  },
  {
    name: 'Next.js',
    description: 'React framework for building full-stack web apps',
    icon: SiNextdotjs,
  },
  {
    name: 'React',
    description: 'UI library for building interactive interfaces',
    icon: FaReact,
  },
  {
    name: 'TypeScript',
    description: 'Typed JavaScript for safer, scalable development',
    icon: TbBrandTypescript,
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    icon: RiTailwindCssFill,
  },
  {
    name: 'Framer Motion',
    description: 'Declarative animations and gestures for React',
    icon: FiFramer,
  },
  {
    name: 'NextAuth.js',
    description: 'Authentication solution for Next.js applications',
    icon: SiFusionauth,
  },
  {
    name: 'Google Cloud / Google OAuth',
    description: 'Secure user authentication and cloud service integration',
    icon: SiGooglecloud,
  },
  {
    name: 'Firebase / Firestore',
    description: 'Realtime cloud database and backend services',
    icon: RiFirebaseFill,
  },
  {
    name: 'Vercel',
    description: 'Hosting and deployment platform optimized for Next.js',
    icon: RiVercelFill,
  },
  {
    name: 'The Odds API',
    description: 'Sports betting odds and market data provider',
    icon: AiFillApi,
  },
  {
    name: 'NBA Stats API',
    description: 'Comprehensive basketball player and team stats',
    icon: AiFillApi,
  },
];


const useCases = [
  {
    title: 'Real-time Odds Analysis',
    description: 'Our model has instant access to live betting odds from multiple sportsbooks, allowing you to make informed decisions in real-time.',
    icon: '📊',
  },
  {
    title: 'Historical Performance',
    description: 'We analyze NBA performance over time to identify patterns and trends that influence game outcomes.',
    icon: '📈',
  },
  {
    title: 'Different Betting Strategies',
    description: 'Test many different betting strategies, including moneyline, spread bets, and over/under, using our comprehensive data and analysis tools.',
    icon: '🎯',
  },
];

const featureSections = [
  {
    title: 'Smart Probability Calculator',
    description: 'Our advanced algorithm combines multiple data points to calculate the most accurate probabilities for game outcomes. Watch how our system analyzes real-time data to provide you with the best betting insights.',
    videoSrc: '/video/Bet_Recording.mp4',
    align: 'left',
  },
  {
    title: 'Team & Player Analysis',
    description: "Get detailed insights into the teams and players you're betting on. Access up-to-date rosters, player statistics, and team performance data to make informed betting decisions.",
    videoSrc: '/video/Team_Recording.mp4',
    align: 'right',
  },
  {
    title: 'Fantasy Betting',
    description: 'Even if you don\'t know the ins and outs of sports betting, you can still make money with our fantasy betting feature. Letting you make bets on imaginery scenarios and more.',
    videoSrc: '/videos/dashboard.mp4',
    align: 'left',
  },
];

const teamMembers = [
  {
    name: 'Jacob Greene',
    role: 'Fullstack Developer',
    image: '/team/Jacob.jpg',
    github: 'https://github.com/jacobgreene-dev',
  },
  {
    name: 'Caleb Youngdahl',
    role: 'Data Analyst & ML engineer',
    image: '/team/caleb.jpg',
    github: 'https://www.linkedin.com/in/caleb-youngdahl',
  },
  {
    name: 'Jasani Smallwood',
    role: 'UI/UX Designer',
    image: '/team/Jasani.jpg',
    github: 'https://github.com/Jassy24',
  },
  {
    name: 'Samuel George',
    role: 'Project Manager & Developer',
    image: '/team/Samuel.jpg',
    github: 'https://github.com/SvGEO290',
  },
  {
    name: 'Hassan Hashim',
    role: 'Documentation Specialist',
    image: '/team/Hasan.jpg',
    github: 'https://www.linkedin.com/in/hasanhashim',
  },
];

export default function ContactPage() {
  const router = useRouter();

  const handleLearnMore = (section: string) => {
    if (section === 'Smart Probability Calculator') {
      router.push('/information');
    } else if (section === 'Team & Player Analysis') {
      router.push('/teams');
    }
  };

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
          A sophisticated sports betting probability calculator that combines real-time odds and
          historical data.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full max-w-sm text-center"
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
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl bg-gray-800">
                  <video
                    className="absolute inset-0 w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={`/thumbnails/${(section.videoSrc.split('/').pop() || 'default.jpg').replace('.mp4', '.jpg')}`}
                  >
                    <source src={section.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                <p className="text-gray-300 text-lg mb-8">{section.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLearnMore(section.title)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
                >
                  Learn More
                </motion.button>
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
          <h1 className="text-4xl font-bold text-center mb-12">Our Tech Stack</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 text-white text-2xl">
                  {tech.icon ? <tech.icon /> : <span className="text-sm">No Icon</span>}
                </div>
                <div className="flex flex-col items-center justify-center h-32 w-48">
                  <h3 className="text-lg font-semibold mb-1 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-300 text-center whitespace-normal break-words leading-snug">
                    {tech.description}
                  </p>
                </div>
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
          <div className="flex flex-wrap justify-center gap-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Link href={member.github} target="_blank" rel="noopener noreferrer">
                  <div className="relative w-40 h-40 mx-auto mb-6 group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
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