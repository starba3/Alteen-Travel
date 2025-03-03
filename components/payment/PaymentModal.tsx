"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PaymentForm } from "./form/PaymentForm";
import { PaymentHeader } from "./PaymentHeader";
import { useState } from "react";
import { PaymentSuccess } from "./states/PaymentSuccess";
import { PaymentError } from "./states/PaymentError";
import type { Country } from "@/lib/countries";
import type { TravelerFormData } from "@/lib/validations/traveler";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  totalAmount: number;
  formData: TravelerFormData;
}

export function PaymentModal({ isOpen, onClose, onSuccess, totalAmount, formData }: PaymentModalProps) {
  const [status, setStatus] = useState<"form" | "success" | "error">("form");

  const handleClose = () => {
    onClose();
    // Reset status after animation completes
    setTimeout(() => setStatus("form"), 300);
  };

  const handleSuccess = () => {
    setStatus("success");
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {status === "form" && (
          <>
            <DialogTitle className="sr-only">Complete Payment</DialogTitle>
            <PaymentHeader amount={totalAmount} onClose={handleClose} />
            <PaymentForm 
              amount={totalAmount}
              formData={formData}
              onSuccess={handleSuccess}
              onError={() => setStatus("error")}
            />
          </>
        )}
        
        {status === "success" && (
          <PaymentSuccess onClose={handleClose} />
        )}
        
        {status === "error" && (
          <PaymentError 
            onRetry={() => setStatus("form")} 
            onClose={handleClose} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
}