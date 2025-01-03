"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  navItems: string[];
}

export const MobileMenu = ({ navItems }: MobileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
    </>
  );
};