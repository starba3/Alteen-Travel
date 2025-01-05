"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NationalitySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function NationalitySearch({ value, onChange }: NationalitySearchProps) {
  return (
    <div className="relative px-3 py-2 border-b">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search countries..."
        className="pl-8 h-9"
      />
    </div>
  );
}