"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface CarouselWrapperProps {
  children: React.ReactNode;
  className?: string;
  slideSize?: "small" | "medium" | "large";
}

export function CarouselWrapper({ children, className, slideSize = "medium" }: CarouselWrapperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const slideSizeClasses = {
    small: "basis-full sm:basis-1/2 lg:basis-1/3",
    medium: "basis-full sm:basis-1/2",
    large: "basis-full lg:basis-1/2",
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex gap-6", className)}>
          {React.Children.map(children, (child) => (
            <div className={cn("flex-shrink-0", slideSizeClasses[slideSize], "transition-all duration-200")}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          !prevBtnEnabled && "opacity-0 cursor-not-allowed pointer-events-none"
        )}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          !nextBtnEnabled && "opacity-0 cursor-not-allowed pointer-events-none"
        )}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}