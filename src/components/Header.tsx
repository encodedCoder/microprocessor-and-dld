"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Microprocessor & DLD
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8 items-center">
              <Link href="/" className="px-3 py-2 rounded-md hover:bg-blue-700">
                Home
              </Link>
              <Link
                href="/avr"
                className="px-3 py-2 rounded-md hover:bg-blue-700"
              >
                AVR Architecture
              </Link>
              <Link
                href="/simulator"
                className="px-3 py-2 rounded-md hover:bg-blue-700"
              >
                Simulator
              </Link>
              <Link
                href="/resources"
                className="px-3 py-2 rounded-md hover:bg-blue-700"
              >
                Resources
              </Link>
            </nav>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/avr"
              className="block px-3 py-2 rounded-md text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              AVR Architecture
            </Link>
            <Link
              href="/simulator"
              className="block px-3 py-2 rounded-md text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Simulator
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 rounded-md text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
