"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, X } from "lucide-react";

export const VisaApplicationForm = () => {
  const [travelers, setTravelers] = useState(1);

  const removeTraveler = (indexToRemove: number) => {
    if (travelers > 1) {
      setTravelers(travelers - 1);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6">Apply for Visa</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Travelers
        </label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTravelers(Math.max(1, travelers - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-semibold">{travelers}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTravelers(travelers + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: travelers }).map((_, index) => (
          <div key={index} className="relative space-y-4 bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Traveler {index + 1}</h4>
              {travelers > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-500"
                  onClick={() => removeTraveler(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input placeholder="Full Name" />
            <Input type="date" placeholder="Date of Birth" />
            <Input placeholder="Passport Number" />
          </div>
        ))}
      </div>

      <Button className="w-full mt-6">Apply for Visa</Button>
    </div>
  );
};