"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

interface PaymentErrorProps {
  onRetry: () => void;
  onClose: () => void;
}

export function PaymentError({ onRetry, onClose }: PaymentErrorProps) {
  return (
    <div className="p-6 text-center">
      <DialogTitle>Payment Failed</DialogTitle>
      <XCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
      <p className="text-muted-foreground mb-6">
        There was an error processing your payment. Please try again or contact support.
      </p>
      <div className="space-x-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
}