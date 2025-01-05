import * as z from "zod";

const nameRegex = /^[a-zA-Z\s-']+$/;
const passportRegex = /^[A-Z0-9]{6,9}$/;
const postalCodeRegex = /^[A-Z0-9\s-]{3,10}$/;

export const visaApplicationSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(nameRegex, "First name can only contain letters, spaces, hyphens and apostrophes"),
  
  middleName: z
    .string()
    .regex(nameRegex, "Middle name can only contain letters, spaces, hyphens and apostrophes")
    .optional(),
  
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(nameRegex, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  
  dateOfBirth: z
    .string()
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, "You must be at least 18 years old"),
  
  passportNumber: z
    .string()
    .regex(passportRegex, "Invalid passport number format"),
  
  nationality: z
    .string()
    .min(2, "Please select your nationality"),
  
  address: z.object({
    street: z
      .string()
      .min(5, "Street address must be at least 5 characters"),
    
    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .regex(nameRegex, "City can only contain letters, spaces, hyphens and apostrophes"),
    
    state: z
      .string()
      .min(2, "State/Province must be at least 2 characters")
      .regex(nameRegex, "State/Province can only contain letters, spaces, hyphens and apostrophes"),
    
    postalCode: z
      .string()
      .regex(postalCodeRegex, "Invalid postal code format"),
  }),
});