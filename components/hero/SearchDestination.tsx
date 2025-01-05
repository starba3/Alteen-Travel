"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchDestination() {
  return (
    <Select>
      <SelectTrigger className="bg-white text-black">
        <SelectValue placeholder="Destination" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="europe">Europe</SelectItem>
        <SelectItem value="asia">Asia</SelectItem>
        <SelectItem value="americas">Americas</SelectItem>
        <SelectItem value="africa">Africa</SelectItem>
      </SelectContent>
    </Select>
  );
}