"use client";

import { Button } from "@/components/ui/button";

export function CountryCardActions() {
  return (
    <Button 
      variant="outline" 
      className="w-full mt-6"
      onClick={() => console.log("Learn More clicked")}
    >
      Learn More
    </Button>
  );
}