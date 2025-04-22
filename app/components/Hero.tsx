// @/app/components/Hero.tsx

import React from 'react';
import { Anek_Latin } from 'next/font/google';
import Image from 'next/image';

const AnekFont = Anek_Latin({
  weight: '600',
  subsets: ['latin'],
});

export default function Hero() {
  return (
    <div className={`relative bg-gradient-to-b from-gray-900 to-black h-[600px] flex items-center ${AnekFont.className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="opacity-40"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          Take Control of the Game
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Empower your strategy with data-driven insights and real-time analysis.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/analysis"
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="/information"
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
}