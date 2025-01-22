// app/api/visa/create/route.ts (server-side)
import { NextResponse } from 'next/server';
import { createVisaApplication } from '@/lib/firebase/visa-service';
import { TravelerFormData } from '@/lib/validations/traveler';
import { PaymentFormData } from '@/lib/types/payment';
import { VisaApplicationResponse } from '@/lib/types/VisaApplication';

interface VisaApplicationData {
  formData: TravelerFormData;
  paymentData: PaymentFormData;
}


export async function POST(req: Request) {
  const { formData, paymentData }: { formData: TravelerFormData; paymentData: PaymentFormData } = await req.json();
    
    try {
      console.log('Creating visa application...');
      const visaId = await createVisaApplication(formData, paymentData);
      console.log('Visa application created successfully:', visaId);
      return NextResponse.json({ success: true, visaId } as VisaApplicationResponse);
    } catch (error) {
      console.error('Failed to create visa:', error);
      return NextResponse.json({ success: false, error: 'Failed to create visa application' } as VisaApplicationResponse);
    }
}
