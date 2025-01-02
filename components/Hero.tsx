"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Next Adventure with TravelPro
        </h1>
        <p className="text-xl md:text-2xl mb-12">
          Explore stunning destinations, unbeatable offers, and seamless booking.
        </p>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Where do you want to go?"
              className="bg-white text-black"
            />
            <Select>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-white text-black">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="july">July 2024</SelectItem>
                <SelectItem value="august">August 2024</SelectItem>
                <SelectItem value="september">September 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="w-full">
              <Search className="mr-2 h-4 w-4" /> Find Trips
            </Button>
          </div>
        </div>

        <Button
          size="lg"
          variant="outline"
          className="mt-8 text-white border-white hover:bg-white hover:text-black"
        >
          Explore Destinations
        </Button>
      </div>
    </div>
  );
};

export default Hero;