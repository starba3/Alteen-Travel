import { v4 as uuidv4 } from 'uuid';
import { PaymentFormData } from "@/lib/validations/payment";
import { generateTransactionId } from "@/lib/utils/transaction";
import { type TravelerFormData } from "@/lib/validations/traveler";

export interface PaymentResponse {
  status: "success" | "error";
  transactionId?: string;
  timestamp?: string;
  redirectUrl?: string,
  error?: string;
}

const API_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL; // Example, can also set default in vercel config

export async function processPayment(
  data: PaymentFormData & { amount: number }
): Promise<PaymentResponse> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // In a real implementation, this would make an API call to a payment processor
    return {
      status: "success",
      transactionId: generateTransactionId(),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "error",
      error: "Payment processing failed. Please try again.",
    };
  }
}

export async function makePaymentAndRedirectPage(
  visaId: string,
  amount: number 
): Promise<PaymentResponse>
{
  // Simulate network latency
  const username = process.env.PAYMENT_API_USERNAME;
  const password = process.env.PAYMENT_API_PASSWORD;
  const terminalId = process.env.PAYMENT_API_TERMINAL_ID;

  console.log(username, password, terminalId);

  if (!username || !password || !terminalId) {
      console.error("Missing authentication credentials in environment variables.");
      return { status: 'error', error: 'Missing authentication credentials.' };
  }

  if (!API_URL) {
      console.error("Missing API URL in environment variables.");
      return { status: 'error', error: 'Missing API URL.' };
  }

  const requestBody = {
      requestId: uuidv4(),
      amount: amount,
      currency: "IQD",
      locale: "en_US",
      finishPaymentUrl: "https://merchant.net/finish", // Consider making dynamic
      notificationUrl: "https://merchhant.net/notification", // Consider making dynamic
  };

  const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encodedCredentials}`,
              'X-Terminal-Id': terminalId,
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          let errorBody = 'No details available';
          try {
              errorBody = await response.text();
          } catch (parseError) {
              console.error("Error parsing error response:", parseError);
          }

          console.error(`API Error (${response.status}): ${errorBody}`);
          return { status: 'error', error: `Payment API request failed with status ${response.status}: ${errorBody}` };
      }

      const responseData = await response.json();

      // Check status and canceled flags before redirecting
      if (responseData && responseData.status === 'CREATED' && responseData.canceled === false) {
          return { status: 'success', redirectUrl: responseData.formUrl };
      } else {
          console.warn("Payment not initiated.  Status:", responseData.status, "Canceled:", responseData.canceled);
          return { status: 'error', error: `Payment could not be initiated. Status: ${responseData.status}, Canceled: ${responseData.canceled}` };
      }

  } catch (error) {
      console.error("Payment API request failed:", error);
      return { status: 'error', error: 'Payment processing failed. Please try again.' };
  }
}