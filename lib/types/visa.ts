export interface VisaApplicationData {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
}