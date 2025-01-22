"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "@/lib/validations/payment";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PaymentFormFields } from "./form/PaymentFormFields";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { PaymentFormData } from "@/lib/types/payment";

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: () => void;
}

const defaultValues: PaymentFormData = {
  cardNumber: "",
  cardHolderName: "",
  expiry: "",
  cvv: "",
  // acceptTerms: false,
};

export function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  async function onSubmit(data: PaymentFormData) {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      
      // Reset form to initial state
      form.reset(defaultValues);
      
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "An error occurred while processing your payment.",
      });
      onError();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <PaymentFormFields form={form} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </form>
    </Form>
  );
}