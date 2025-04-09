// app/api/confirm-payment/route.ts (server-side)
import { NextResponse } from 'next/server';
import { ConfirmVisaApplicationPayment } from '@/lib/firebase/visa-service'; // Import the confirmation function
import { redirect } from 'next/navigation'; // Import redirect

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const visaId = searchParams.get('visaId');

  if (!visaId) {
    return NextResponse.json({ success: false, error: 'Missing visaId query parameter' }, { status: 400 });
  }

  try {
    await ConfirmVisaApplicationPayment(visaId);

    // Redirect to the root page upon successful confirmation
    redirect('/');

  } catch (error) {
    console.error('Failed to confirm visa payment:', error);
    // Return JSON error response instead of redirecting on failure
    return NextResponse.json({ success: false, error: 'Failed to confirm visa payment' }, { status: 500 });
  }
}