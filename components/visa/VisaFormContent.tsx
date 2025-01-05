"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, X } from "lucide-react";
import { TravelerFields } from "./TravelerFields";

export function VisaFormContent() {
  const [mounted, setMounted] = useState(false);
  const [travelers, setTravelers] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeTraveler = () => {
    if (travelers > 1) {
      setTravelers(travelers - 1);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
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
          <TravelerFields 
            key={index} 
            index={index} 
            showRemove={travelers > 1}
            onRemove={removeTraveler}
          />
        ))}
      </div>

      <Button className="w-full mt-6">Apply for Visa</Button>
    </>
  );
}