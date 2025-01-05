"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { PersonalDetails } from "./sections/PersonalDetails";
import { AddressDetails } from "./sections/AddressDetails";
import { Button } from "@/components/ui/button";
import { visaApplicationSchema } from "@/lib/validations/visa-application";
import type { VisaApplicationData } from "@/lib/types/visa";

export function VisaApplicationForm() {
  const form = useForm<VisaApplicationData>({
    resolver: zodResolver(visaApplicationSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      passportNumber: "",
      nationality: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
    },
  });

  const onSubmit = (data: VisaApplicationData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalDetails form={form} />
        <AddressDetails form={form} />
        
        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>
    </Form>
  );
}