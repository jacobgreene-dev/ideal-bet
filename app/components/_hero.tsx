// app/components/_hero.tsx
import React from 'react';

export default function Hero() {
  return (
    <div className="bg-black h-96 flex flex-col items-center justify-center">
      <div className="w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.sidearmdev.com/convert?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcgspartans.com%2Fimages%2F2023%2F11%2F10%2FUNCG_MBKB_111023_1300_copy.jpg&type=webp')", backgroundSize: 'contain' }}>
        <h1 className="text-4xl font-bold text-center text-white">Welcome to the Hero Component</h1>
      </div>
    </div>
  );
};
