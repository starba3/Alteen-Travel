import { NextResponse } from 'next/server';
import { PaymentService } from '@/lib/payment/paymentService';

export async function POST(request: Request) {
  try {
    const paymentService = PaymentService.getInstance();
    const body = await request.json();
    
    const paymentIntent = await paymentService.createPaymentIntent({
      amount: body.amount,
      description: body.description,
      metadata: body.metadata,
    });

    return NextResponse.json({ paymentIntent });
  } catch (error) {
    return NextResponse.json(
      { error: 'Payment creation failed' },
      { status: 500 }
    );
  }
} 