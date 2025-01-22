"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PaymentFormFields } from "./PaymentFormFields";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processPayment } from "@/lib/utils/payment";
// import { PaymentFormData } from "@/lib/validations/payment";
import { TravelerFormData } from "@/lib/validations/traveler";
import { createVisaAction } from '@/app/actions/visa';
import { uploadTravelerImages } from "@/lib/utils/image-upload";
import { VisaApplicationResponse } from "@/lib/types/VisaApplication";

interface PaymentFormProps {
  amount: number;
  formData: TravelerFormData;
  onSuccess: () => void;
  onError: () => void;
}

// Define the schema outside the component
export const paymentSchema = z.object({
  cardNumber: z.string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{16}$/.test(val), "Card number must be 16 digits"),
    
  cardHolderName: z.string().min(1, "Cardholder name is required"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "Invalid CVV"),
});

// Infer the type from the schema
export type PaymentFormData = z.infer<typeof paymentSchema>;



export function PaymentForm({ amount, formData, onSuccess, onError }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PaymentFormData>({
    defaultValues: {
      cardNumber: "",
      cardHolderName: "",
      expiry: "",
      cvv: "",
    },
    resolver: zodResolver(paymentSchema),
  });

  async function handleVisaApplication(formData: TravelerFormData, paymentData: PaymentFormData) {
    const response = await fetch('/api/create-visa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData, paymentData }),
    });
    
    const result: VisaApplicationResponse = await response.json();
    
    if (result.success) {
      console.log('Visa ID:', result.visaId);
    } else {
      throw new Error(result.error);
    }
  
  }

  const onSubmit = async (values: PaymentFormData) => {
    setIsLoading(true);
    try {
      console.log('Creating visa application...');
      console.log('Form data:', formData);
      console.log('Payment data:', values);

      // Upload all images and get updated traveler data
      const updatedTravelers = await uploadTravelerImages(formData.travelers, 'visa');
      const updatedFormData = { ...formData, travelers: updatedTravelers };

      console.log('updatedFormData:', updatedFormData);

      // Create the visa application using server action
      await handleVisaApplication(updatedFormData, values);
      
      // if (!visaResult.success) {
      //   throw new Error(visaResult.error);
      // }

      // Then process the payment
      const paymentResult = await processPayment({ ...values, amount });
      
      if (paymentResult.status === "success") {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
        form.reset();
        onSuccess();
      } else {
        throw new Error(paymentResult.error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your payment.",
      });
      onError();
    } finally {
      setIsLoading(false);
    }
  };

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
            `Pay ${amount.toLocaleString()} IQD`
          )}
        </Button>
      </form>
    </Form>
  );
}