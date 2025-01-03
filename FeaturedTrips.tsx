"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const trips = [
  {
    name: "Greek Islands Explorer",
    image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a",
    price: "$1,299",
    duration: "7 Days",
    highlights: ["Island Hopping", "Ancient Ruins", "Local Cuisine"],
  },
  {
    name: "Japanese Culture Tour",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    price: "$2,499",
    duration: "10 Days",
    highlights: ["Temple Visits", "Tea Ceremony", "Mount Fuji"],
  },
  {
    name: "Costa Rica Adventure",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    price: "$1,799",
    duration: "8 Days",
    highlights: ["Rainforest Trek", "Volcano Tour", "Beach Time"],
  },
];

const FeaturedTrips = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Our Featured Trips</h2>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">1-7 Days</SelectItem>
                <SelectItem value="medium">8-14 Days</SelectItem>
                <SelectItem value="long">15+ Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div key={trip.name} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-48">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-bold text-primary">{trip.price}</span>
                  <span className="text-gray-600">{trip.duration}</span>
                </div>
                <ul className="mb-4">
                  {trip.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-600">• {highlight}</li>
                  ))}
                </ul>
                <Button className="w-full">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;