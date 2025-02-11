// app/components/_footer.tsx
import React from "react";

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from "react-bootstrap-icons";

export default function Footer(){
  return (
    <footer className="bg-white text-black py-8 px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Social Icons */}
        <div className="flex flex-col space-y-3">
          <h3>Project Name</h3>
          <div className="flex space-x-3">
            <a href="#"><Facebook className="w-6 h-6" /></a>
            <a href="#"><Youtube className="w-6 h-6" /></a>
            <a href="#"><Twitter className="w-6 h-6" /></a>
            <a href="#"><Instagram className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-3 gap-12 text-sm">
          <div>
            <h4 className="font-bold mb-2">Project Goals</h4>
            <ul className="space-y-1">
              <li>UI design</li>
              <li>UX design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Explore</h4>
            <ul className="space-y-1">
              <li>Design</li>
              <li>Prototyping</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Blog</li>
              <li>Best practices</li>
              <li>Colors</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
