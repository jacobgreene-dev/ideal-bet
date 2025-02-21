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
      <div className="relative z-10 text-center text-white">
        <div className='box-content md:box-border bg-black/55 p-2 rounded-2xl max-w-4xl mx-auto'>
          <h1 className="text-8xl font-black">Ideal Bet</h1>
          <div className="flex flex-col items-center justify-center w-1/2 mx-auto">
            <p className="mt-4 text-lg text-wrap: pretty">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan purus nisi, nec laoreet quam auctor eleifend. Quisque nisl sapien.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}