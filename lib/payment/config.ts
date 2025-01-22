export const PAYMENT_CONFIG = {
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  CURRENCY: 'IQD',
  PAYMENT_SUCCESS_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
  PAYMENT_CANCEL_URL: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
}; 