"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentSuccessProps {
  onClose: () => void;
}

export function PaymentSuccess({ onClose }: PaymentSuccessProps) {
  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-semibold mb-8">Payment Successful</h2>
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <p className="text-gray-600 mb-6">
        Your payment has been processed successfully.
        <br />
        You will receive a confirmation email shortly.
      </p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}