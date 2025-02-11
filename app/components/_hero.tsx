// app/components/_hero.tsx
import React from 'react';

export default function Hero() {
  return (
    <div className="bg-cover bg-center min-h-100 flex flex-col items-center justify-center" style={{ backgroundImage: "url('https://example.com/your-image.jpg')" }}>
      <h1 className="text-4xl font-bold text-center text-white">Welcome to the Hero Component</h1>
    </div>
  );
};
