"use client";

import { TripCard } from "./TripCard";
import { trips } from "@/lib/trips";
import { CarouselWrapper } from "../carousel/CarouselWrapper";

export function TripGrid() {
  return (
    <CarouselWrapper slideSize="medium">
      {trips.map((trip) => (
        <TripCard
          key={trip.name}
          {...trip}
        />
      ))}
    </CarouselWrapper>
  );
}