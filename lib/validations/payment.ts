import * as z from "zod";

export const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number"),
  cardHolder: z.string()
    .min(3, "Please enter the cardholder name")
    .max(50, "Name is too long"),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date"),
  cvv: z.string()
    .regex(/^[0-9]{3,4}$/, "Invalid CVV"),
  acceptTerms: z.boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;