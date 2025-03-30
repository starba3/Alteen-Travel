import { PaymentResponse } from "../api/payment";

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface PaymentRequestData {
  amount: number;
  visaId?: string;
}

export class PaymentService {
  private static instance: PaymentService;

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async createPaymentIntent(params: CreatePaymentParams): Promise<PaymentIntent> {
    return {
      id: "mock_payment_intent_id",
      amount: params.amount,
      currency: params.currency || "USD",
      status: "created",
    };
  }

  async confirmPayment(paymentIntentId: string): Promise<PaymentIntent> {
    return {
      id: paymentIntentId,
      amount: 100,
      currency: "USD",
      status: "success",
    };
  }

  async getPaymentStatus(paymentIntentId: string): Promise<string> {
    return "success";
  }

  async makePaymentRequest(visaId: string, amount: number) {
    const requestBody: PaymentRequestData = { visaId, amount }; // Create the request body object
      const response = await fetch('/api/make-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const paymentResponse = await response.json();
  
      return paymentResponse;
  }
}
