"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TravelerFields } from "./TravelerFields";
import { PaymentModal } from "../payment/PaymentModal";
import { 
  travelerSchema, 
  type TravelerFormData,
  defaultTraveler 
} from "@/lib/validations/traveler";
import type { Country } from "@/lib/countries";

interface VisaApplicationFormProps {
  selectedCountry: Country;
  preview?: boolean;
}

export function VisaApplicationForm({ selectedCountry, preview }: VisaApplicationFormProps) {
  const [showPayment, setShowPayment] = useState(false);
  
  const form = useForm<TravelerFormData>({
    resolver: zodResolver(travelerSchema),
    defaultValues: {
      travelers: [{
        givenName: '',
        fatherName: '',
        surname: '',
        nationality: '',
        dateOfBirth: '',
        passportNumber: '',
        personalPhoto: undefined as File | undefined,
        passportPhoto: undefined as File | undefined
        
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers"
  });

  const totalPrice = selectedCountry.price * fields.length;

  const onSubmit = (data: TravelerFormData) => {
    setShowPayment(true);
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Visa Application for {selectedCountry.name}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 sm:space-y-6">
            {fields.map((field, index) => (
              <TravelerFields
                key={field.id}
                index={index}
                showRemove={fields.length > 1}
                onRemove={() => remove(index)}
                form={form}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => append(defaultTraveler)}
              className="w-full sm:w-auto"
            >
              Add Traveler
            </Button>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-xl sm:text-2xl font-bold">${totalPrice} USD</p>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">
            {preview ? "Start Full Application" : "Continue to Payment"}
          </Button>
        </form>
      </Form>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        country={selectedCountry}
        travelers={fields.length}
      />
    </div>
  );
}