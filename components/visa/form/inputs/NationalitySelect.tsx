"use client";

import { forwardRef, useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { NationalityTrigger } from "./nationality/NationalityTrigger";
import { NationalitySearch } from "./nationality/NationalitySearch";
import { NationalityOption } from "./nationality/NationalityOption";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import type { Country } from "@/lib/countries";

interface NationalitySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const NationalitySelect = forwardRef<HTMLDivElement, NationalitySelectProps>(
  ({ value, onChange, onBlur, disabled, className, placeholder = "Select nationality" }, ref) => {
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

    const selectedCountry = countries.find(c => c.code === value);

    const handleSelect = useCallback((code: string) => {
      onChange?.(code);
      setIsOpen(false);
      setSearch("");
    }, [onChange]);

    const { focusedIndex, setFocusedIndex } = useKeyboardNavigation({
      itemCount: filteredCountries.length,
      isOpen,
      onSelect: (index: number) => handleSelect(filteredCountries[index].name),
      onEscape: () => setIsOpen(false),
    });

    useEffect(() => {
      if (!isOpen) {
        setSearch("");
        setFocusedIndex(-1);
      }
    }, [isOpen, setFocusedIndex]);

    if (isLoading) {
      return (
        <div className={`w-full h-12 rounded-lg border-gray-200 ${className}`}>
          <div className="flex items-center px-3 h-full">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div ref={containerRef} className="relative w-full">
        <div ref={ref}>
          <NationalityTrigger
            selectedCountry={selectedCountry}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md">
            <NationalitySearch value={search} onChange={setSearch} />
            
            <div className="max-h-[200px] overflow-auto p-1">
              {filteredCountries.map((country, index) => (
                <NationalityOption
                  key={country.code}
                  country={country}
                  isSelected={country.code === value}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

NationalitySelect.displayName = "NationalitySelect";

export { NationalitySelect };