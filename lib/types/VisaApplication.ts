import { Person } from './Person';

export interface VisaApplication {
    cardExpiryDate: string;
    cardHolderName: string;
    cardNumber: string;
    cvc: string;
    id: string;
    email: string;
    nameOnHeader: string;
    phoneNumber: string;
    price: string;
    country: string;
    countryArabic: string;
    tripId: string;
    persons: Person[];
    createdAt?: string;
    status?: 'pending' | 'approved' | 'rejected';
  }