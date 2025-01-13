import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const travelerSchema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number is too short").max(11, "Phone number is too long"),
  country: z.object({
    code: z.string(),
    name: z.string(),
    flag: z.string(),
    price: z.number(),
    processingTime: z.string()
  }).optional(),
  travelers: z.array(z.object({
    givenName: z.string()
      .min(2, "Given name must be at least 2 characters")
      .max(50, "Given name must be less than 50 characters"),
    
    fatherName: z.string()
      .min(2, "Father's name must be at least 2 characters")
      .max(50, "Father's name must be less than 50 characters"),
    
    surname: z.string()
      .min(2, "Surname must be at least 2 characters")
      .max(50, "Surname must be less than 50 characters"),
    
    dateOfBirth: z.string()
      .min(1, "Date of birth is required")
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 0 && birthDate <= today;
      }, "Invalid date of birth"),
    
    passportNumber: z.string()
      .min(6, "Passport number must be at least 6 characters")
      .max(15, "Passport number must be less than 15 characters")
      .regex(/^[A-Z0-9]+$/, "Passport number must contain only uppercase letters and numbers"),
    
    nationality: z.string()
      .min(2, "Nationality is required"),
    
    personalPhoto: z.any()
      .refine((file) => {
        if (!file || !file.length) return true;
        const fileValue = file[0];
        return fileValue instanceof File;
      }, "Please upload a valid file")
      .refine((file) => {
        if (!file || !file.length) return true;
        const fileValue = file[0];
        return fileValue.size <= MAX_FILE_SIZE;
      }, "File size must be less than 5MB")
      .refine((file) => {
        if (!file || !file.length) return true;
        const fileValue = file[0];
        return ACCEPTED_IMAGE_TYPES.includes(fileValue.type);
      }, "Only .jpg, .jpeg, and .png files are accepted")
      .optional(),
    
    passportPhoto: z.any()
      .refine((file) => {
        if (!file || !file.length) return true;
        const fileValue = file[0];
        return fileValue instanceof File;
      }, "Please upload a valid file")
      .refine((file) => {
        if (!file || !file.length) return true;
        const fileValue = file[0];
        return fileValue.size <= MAX_FILE_SIZE;
      }, "File size must be less than 5MB")
      .refine((file) => {
        if (!file || !file.length) return true;
        const fileValue = file[0];
        return ACCEPTED_IMAGE_TYPES.includes(fileValue.type);
      }, "Only .jpg, .jpeg, and .png files are accepted")
      .optional(),
  }))
  .min(1, "At least one traveler is required"),
});

export type TravelerFormData = z.infer<typeof travelerSchema>;

export const defaultTraveler = {
  email: "",
  phoneNumber: "",
  country: {
    code: "",
    name: "",
    flag: "",
    price: 0
  },
  givenName: "",
  fatherName: "",
  surname: "",
  dateOfBirth: "",
  passportNumber: "",
  nationality: "",
  personalPhoto: undefined,
  passportPhoto: undefined,
} as const;

export type DefaultTraveler = typeof defaultTraveler;