import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-black h-96 flex items-center justify-center">
      <Image
        src="/hero.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ opacity: 0.5 }}
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-8xl font-black">Project Name</h1>
        <p className="mt-4 text-lg">This is a description text positioned in the center.</p>
      </div>
    </div>
  );
}