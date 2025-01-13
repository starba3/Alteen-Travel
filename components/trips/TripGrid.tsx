"use client";

import { TripCard } from "./TripCard";
import { trips } from "@/lib/trips";
import { CarouselWrapper } from "../carousel/CarouselWrapper";
import { useParams } from "next/navigation";
export function TripGrid() {
  const params = useParams();
  const locale = params.locale as string || "en";
  return (
    <CarouselWrapper slideSize="medium">
      {trips.map((trip) => (
        <TripCard
          key={trip.name}
          locale={locale} 
          {...trip}
        />
      ))}
    </CarouselWrapper>
  );
}