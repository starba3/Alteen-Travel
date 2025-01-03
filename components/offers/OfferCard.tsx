"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface OfferCardProps {
  title: string;
  discount: string;
  description: string;
  validUntil: string;
  image: string;
}

export const OfferCard = ({ title, discount, description, validUntil, image }: OfferCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full">
          {discount}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Valid until {validUntil}</span>
        </div>
        <Button className="w-full">Claim Offer</Button>
      </div>
    </div>
  );
};