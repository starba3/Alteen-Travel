"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface VisaServicesHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VisaServicesHeader({ searchQuery, onSearchChange }: VisaServicesHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-6">Visa Services</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore our comprehensive visa services for countries worldwide. We provide hassle-free visa processing with expert guidance throughout your application.
      </p>
      
      <div className="relative max-w-xl">
        <Input
          placeholder="Search countries..."
          className="pl-12"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}