"use client";

import { DestinationCard } from "./DestinationCard";
import { destinations } from "@/lib/destinations";
import { CarouselWrapper } from "../carousel/CarouselWrapper";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";


export async function DestinationGrid() {
  const params = useParams();
  const locale = params.locale as string || "en";

  return (
    <CarouselWrapper slideSize="small">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.name}
          {...destination}
          locale={locale}
        />
      ))}
    </CarouselWrapper>
  );
}