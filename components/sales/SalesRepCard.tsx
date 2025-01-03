"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SalesRepCardProps {
  name: string;
  role: string;
  photo: string;
  phone: string;
  email: string;
  location: string;
}

export const SalesRepCard = ({ name, role, photo, phone, email, location }: SalesRepCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-primary mb-4">{role}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start">
            <Phone className="h-4 w-4 mr-2" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <Mail className="h-4 w-4 mr-2" />
            <span>{email}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <Button className="mt-4">Get in Touch</Button>
      </div>
    </div>
  );
};