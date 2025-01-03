"use client";

import { Button } from "@/components/ui/button";

interface TripCardProps {
  name: string;
  image: string;
  price: string;
  duration: string;
  highlights: string[];
}

export const TripCard = ({ name, image, price, duration, highlights }: TripCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex justify-between mb-4">
          <span className="text-lg font-bold text-primary">{price}</span>
          <span className="text-gray-600">{duration}</span>
        </div>
        <ul className="mb-4">
          {highlights.map((highlight) => (
            <li key={highlight} className="text-gray-600">• {highlight}</li>
          ))}
        </ul>
        <Button className="w-full">Book Now</Button>
      </div>
    </div>
  );
};