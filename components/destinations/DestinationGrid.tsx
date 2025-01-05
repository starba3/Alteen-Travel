"use client";

import { DestinationCard } from "./DestinationCard";
import { destinations } from "@/lib/destinations";
import { CarouselWrapper } from "../carousel/CarouselWrapper";

export function DestinationGrid() {
  return (
    <CarouselWrapper slideSize="small">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.name}
          {...destination}
        />
      ))}
    </CarouselWrapper>
  );
}