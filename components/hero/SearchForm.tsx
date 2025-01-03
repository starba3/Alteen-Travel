"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SearchForm = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Where do you want to go?"
          className="bg-white text-black"
        />
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
        <Button size="lg" className="w-full">
          <Search className="mr-2 h-4 w-4" /> Find Trips
        </Button>
      </div>
    </div>
  );
};