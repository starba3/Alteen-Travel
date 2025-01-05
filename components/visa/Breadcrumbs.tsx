"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  currentStep?: number;
}

export function Breadcrumbs({ currentStep }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="flex items-center hover:text-primary">
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/visa-services" className="hover:text-primary">
        Visa Services
      </Link>
      {currentStep && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Application Step {currentStep}</span>
        </>
      )}
    </nav>
  );
}