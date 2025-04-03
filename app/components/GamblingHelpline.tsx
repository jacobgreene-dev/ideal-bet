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
        src="/gamblinghelpline.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        style={{ opacity: 0.5 }}
      />
      <div className="absolute z-10 text-left text-white">
          <h1 className="text-6xl font-black">GET THE HELP YOU NEED</h1>
            <div className="flex justify-center w-full mx-auto">
            </div>
        </div>
      </div>
  );
}