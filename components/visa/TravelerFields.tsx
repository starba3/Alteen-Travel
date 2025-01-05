"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { TravelerFormData } from "@/lib/validations/traveler";
import { TravelerNameFields } from "./form/fields/TravelerNameFields";
import { TravelerPassportFields } from "./form/fields/TravelerPassportFields";
import { TravelerDateFields } from "./form/fields/TravelerDateFields";
import { TravelerDocumentFields } from "./form/fields/TravelerDocumentFields";

interface TravelerFieldsProps {
  index: number;
  showRemove: boolean;
  onRemove: () => void;
  form: UseFormReturn<TravelerFormData>;
}

export function TravelerFields({
  index,
  showRemove,
  onRemove,
  form,
}: TravelerFieldsProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg"
    >
      <div className="flex justify-between items-center">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-transparent">
            <h4 className="font-medium mr-2 text-sm sm:text-base">Traveler {index + 1}</h4>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        {showRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-red-500"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <CollapsibleContent className="space-y-6">
        <TravelerNameFields form={form} index={index} />
        <TravelerDateFields form={form} index={index} />
        <TravelerPassportFields form={form} index={index} />
        <TravelerDocumentFields form={form} index={index} />
      </CollapsibleContent>
    </Collapsible>
  );
}