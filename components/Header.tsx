"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "Destinations",
    "Offers",
    "Trips",
    "Visa Services",
    "About Us",
    "Contact",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Plane className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">TravelPro</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <Button size="lg" className="hidden md:block">
            Book Now
          </Button>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
            <Button size="lg" className="w-full mt-4">
              Book Now
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;