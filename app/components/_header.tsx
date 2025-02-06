// app/components/_header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">My Landing Page</div>
        <ul className="flex space-x-6">
          <li><a href="#features" className="hover:text-blue-400">Features</a></li>
          <li><a href="#pricing" className="hover:text-blue-400">Pricing</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
