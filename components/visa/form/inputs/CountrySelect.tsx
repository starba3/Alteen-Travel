"use client";

import { forwardRef, useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { Flag } from "@/components/ui/flag";
import type { Country } from "@/lib/countries";

interface CountrySelectProps {
  value?: Country;
  onChange?: (country: Country) => void;
  className?: string;
  placeholder?: string;
}

export const CountrySelect = forwardRef<HTMLDivElement, CountrySelectProps>(
  ({ value, onChange, className, placeholder = "Select country" }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const debouncedSearch = useDebounce(search);
    const containerRef = useOnClickOutside<HTMLDivElement>(() => setIsOpen(false));
    
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await fetch('/api/countries');
          const data = await response.json();
          setCountries(data);
        } catch (error) {
          console.error('Error fetching countries:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCountries();
    }, []);

    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleSelect = (country: Country) => {
      onChange?.(country);
      setIsOpen(false);
      setSearch("");
    };

    if (isLoading) {
      return (
        <Button
          variant="outline"
          className={`w-full justify-between ${className}`}
          disabled
        >
          Loading countries...
        </Button>
      );
    }

    return (
      <div ref={containerRef} className="relative w-full">
        <Button
          ref={ref as React.RefObject<HTMLButtonElement>}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={`w-full justify-between ${className}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? (
            <div className="flex items-center gap-2">
              <span className="text-xl">{value.flag}</span>
              <span>{value.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md">
            <div className="flex items-center p-2 border-b">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 focus-visible:ring-0"
              />
            </div>
            
            <div className="max-h-[300px] overflow-auto p-1">
              {filteredCountries.map((country) => (
                <Button
                  key={country.code}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleSelect(country)}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="ml-2">{country.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CountrySelect.displayName = "CountrySelect"; 