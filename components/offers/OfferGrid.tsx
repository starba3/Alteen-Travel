"use client";

import { OfferCard } from "./OfferCard";
import { offers } from "@/lib/offers";
import { CarouselWrapper } from "../carousel/CarouselWrapper";

export function OfferGrid() {
  return (
    <CarouselWrapper slideSize="medium">
      {offers.map((offer) => (
        <OfferCard key={offer.title} offer={offer} />
      ))}
    </CarouselWrapper>
  );
}