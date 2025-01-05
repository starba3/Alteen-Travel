import type { PaymentFormData, PaymentResponse } from "@/lib/types/payment";

// Card formatting utilities
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/(\d{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
}

// Validation utilities
export function validateExpiry(expiry: string): boolean {
  const [month, year] = expiry.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expiryMonth = parseInt(month, 10);
  const expiryYear = parseInt(year, 10);
  
  if (expiryYear < currentYear) return false;
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false;
  
  return true;
}

// Mock payment processing
export async function processPayment(
  data: PaymentFormData & { amount: number }
): Promise<PaymentResponse> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate basic validation
  if (!validateExpiry(data.expiry)) {
    throw new Error("Card has expired");
  }

  // In a real implementation, this would make an API call to a payment processor
  return {
    status: "success",
    transactionId: generateTransactionId(),
    timestamp: new Date().toISOString(),
  };
}

// Helper function to generate mock transaction IDs
function generateTransactionId(): string {
  return `txn_${Math.random().toString(36).substr(2, 9)}`;
}