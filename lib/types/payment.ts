export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
  acceptTerms: boolean;
}

export interface PaymentResponse {
  status: "success" | "error";
  transactionId?: string;
  timestamp?: string;
  error?: string;
}