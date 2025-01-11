"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">
        We encountered an error while loading the page.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}