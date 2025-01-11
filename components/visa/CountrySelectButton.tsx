"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useTranslations } from "@/lib/i18n/hooks";


interface CountrySelectButtonProps {
  selected: boolean;
  onClick: () => void;
}

export function CountrySelectButton({ selected, onClick }: CountrySelectButtonProps) {
  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);

  return (
    <Button 
      variant="outline" 
      className={cn(
        "w-full mt-4 transition-all duration-300",
        selected && "bg-primary text-primary-foreground hover:bg-primary/90"
      )}
      onClick={onClick}
    >
      {selected ? 'Selected' : 'Select Country'}
    </Button>
  );
} 