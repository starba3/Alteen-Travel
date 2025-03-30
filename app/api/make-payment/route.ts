import { NextResponse } from 'next/server';
import { makePaymentAndRedirectPage } from '@/lib/api/payment';

// pages/api/make-payment.js


export async function POST(request: Request) {

  try {
    const body = await request.json();// Assuming data and amount are sent in the request body

    const result = await makePaymentAndRedirectPage(body.visaId, body.amount);

    if (result.status === 'success') {
      // The payment initiation was successful
      // Option 1: Redirect from the server (recommended)
      if (result.redirectUrl) {
        return NextResponse.json({ ...result }, { status: 200 }); // Include redirectUrl
      } else {
        // If there's no redirect URL (unexpected), return a success message
        return NextResponse.json(
            { error: 'Payment creation Not Successful' },
            { status: 500 }
          );
      }

      // Option 2: Return the redirect URL to the client (if redirecting on client-side)
      // return res.status(200).json({ status: 'success', redirectUrl: result.redirectUrl });

    } else {
      // Payment initiation failed
      return NextResponse.json(
        { error: 'Payment creation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment API Error:', error);
    return NextResponse.json(
        { error: 'Payment processing failed' },
        { status: 500 }
      );
    
  }
}