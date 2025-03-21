// app/components/_footer.tsx
import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-6 px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Brand and Social */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Ideal Bet</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="w-5 h-5 hover:text-red-500 transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-pink-500 transition" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold mb-3">Project Goals</h4>
            <ul className="space-y-2 text-gray-300">
              <li>UI Design</li>
              <li>UX Design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Design</li>
              <li>Prototyping</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Blog</li>
              <li>Best Practices</li>
              <li>Colors</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
