export interface FirebaseUser {
  address?: string;
  companyEmail?: string | null;
  companyName?: string | null;
  country?: string | null;
  countryKey?: string | null;
  dateOfRegister?: string | null;
  email: string;
  image: string;
  isAdmin: boolean;
  location: string;
  name: string;
  phoneNumber: string;
  state?: string | null;
  uId: string;
  visaPrice: string;
} 