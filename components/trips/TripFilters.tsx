"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TripFilters() {
  return (
    <div className="flex gap-4">
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Destination" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="europe">Europe</SelectItem>
          <SelectItem value="asia">Asia</SelectItem>
          <SelectItem value="americas">Americas</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">1-7 Days</SelectItem>
          <SelectItem value="medium">8-14 Days</SelectItem>
          <SelectItem value="long">15+ Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}