import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-black h-96 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/images/my-image.jpg')" }}
      ></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to the Hero Component</h1>
        <p className="mt-4 text-lg">This is a description text positioned in the center.</p>
      </div>
    </div>
  );
}