'use server'

import * as z from "zod";
import { createVisaApplication } from '@/lib/firebase/visa-service';
import type { TravelerFormData } from '@/lib/validations/traveler';

export const paymentSchema = z.object({
  cardNumber: z.string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d{16}$/.test(val), "Card number must be 16 digits"),
  cardHolderName: z.string()
    .min(3, "Please enter the cardholder name")
    .max(50, "Name is too long"),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date"),
  cvv: z.string()
    .regex(/^[0-9]{3,4}$/, "Invalid CVV"),
  // acceptTerms: z.boolean()
  //   .refine((val) => val === true, "You must accept the terms and conditions"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

export async function createVisaAction(
  formData: TravelerFormData,
  paymentData: PaymentFormData
) {
  try {
    return await createVisaApplication(formData, paymentData);
  } catch (error) {
    console.error('Visa creation failed:', error);
    throw new Error('Failed to create visa application');
  }
}