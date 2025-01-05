"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function SearchFilters() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
            <SelectItem value="americas">Americas</SelectItem>
            <SelectItem value="africa">Africa</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">1-7 Days</SelectItem>
            <SelectItem value="medium">8-14 Days</SelectItem>
            <SelectItem value="long">15+ Days</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">Under $1000</SelectItem>
            <SelectItem value="mid">$1000-$3000</SelectItem>
            <SelectItem value="luxury">$3000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm">Reset</Button>
        <Button size="sm">Apply Filters</Button>
      </div>
    </div>
  );
}