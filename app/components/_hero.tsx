import React from 'react';
import { Anek_Latin } from 'next/font/google';
import Image from 'next/image';

const AnekFont = Anek_Latin({ 
  weight:"500",
  subsets:["latin"]
});

export default function Hero() {
  return (
    <div className={`relative bg-black h-96 flex items-center justify-center ${AnekFont.className}`}>
      <Image
        src="/hero.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ opacity: 0.5 }}
      />
      <div className="absolute z-10 text-left text-white">
        <div className='box-content md:box-border bg-black/55 p-2 rounded-2xl max-w-4xl mx-auto'>
          <h1 className="text-6xl font-black">THE GAME IS YOURS</h1>
            <div className="flex justify-center w-full mx-auto">
              <p className="mt-4 text-lg whitespace-nowrap">We can help you with optimizations for your strategy</p>
            </div>
        </div>
      </div>
    </div>
  );
}