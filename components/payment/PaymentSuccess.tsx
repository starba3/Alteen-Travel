"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentSuccessProps {
  onClose: () => void;
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  return (
    <div className="p-6 text-center">
      <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
      <p className="text-muted-foreground mb-6">
        Your payment has been processed successfully. You will receive a confirmation email shortly.
      </p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}