"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

interface PaymentHeaderProps {
  amount: number;
  onClose: () => void;
}

export function PaymentHeader({ amount, onClose }: PaymentHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div>
        <DialogTitle className="text-lg font-semibold">Complete Payment</DialogTitle>
        <p className="text-sm text-muted-foreground">
          Amount to pay: ${amount.toFixed(2)}
        </p>
      </div>
      {/* Only show close button on desktop */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-gray-100 hidden md:flex"
        onClick={onClose}
        aria-label="Close payment form"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}