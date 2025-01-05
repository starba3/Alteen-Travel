"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchDate() {
  return (
    <Select>
      <SelectTrigger className="bg-white text-black">
        <SelectValue placeholder="Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="july">July 2024</SelectItem>
        <SelectItem value="august">August 2024</SelectItem>
        <SelectItem value="september">September 2024</SelectItem>
      </SelectContent>
    </Select>
  );
}