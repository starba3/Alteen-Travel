"use client";

import { Country } from "@/lib/countries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
  selected?: boolean;
  onSelect: () => void;
}

export function CountryCard({ country, selected, onSelect }: CountryCardProps) {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02]",
        selected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl transition-transform hover:scale-110 duration-200">
          {country.flag}
        </span>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{country.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Processing time: {country.processingTime}
          </p>
          <p className="text-lg font-medium text-primary">
            ${country.price} USD
          </p>
        </div>
      </div>
      <Button 
        variant="outline" 
        className={cn(
          "w-full mt-4 transition-all duration-300",
          selected && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {selected ? 'Selected' : 'Select Country'}
      </Button>
    </Card>
  );
}