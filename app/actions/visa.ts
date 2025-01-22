// 'use server'

import { createVisaApplication } from "@/lib/firebase/visa-service";
import { TravelerFormData } from "@/lib/validations/traveler";
import { PaymentFormData } from "@/lib/types/payment";

export async function createVisaAction(formData: TravelerFormData, paymentData: PaymentFormData) {
  try {
    console.log('Creating visa application...');
    console.log('Form data 2:', formData);
    console.log('Payment data 2:', paymentData);
    const visaId = await createVisaApplication(formData, paymentData);
    console.log('Visa application created successfully:', visaId);
    return { success: true, visaId };
  } catch (error) {
    console.error('Failed to create visa:', error);
    return { success: false, error: 'Failed to create visa application' };
  }
} 