import { firestore } from './admin-config';
import { v4 as uuidv4 } from 'uuid';
import { TravelerFormData } from '@/lib/validations/traveler';
import { Timestamp } from 'firebase-admin/firestore';
import { PaymentFormData } from '../types/payment';

interface VisaApplicationData {
  id: string;
  cardExpiryDate: string;
  cardHolderName: string;
  cardNumber: string;
  country: string;
  countryArabic: string;
  createdAt: Timestamp;
  cvc: string;
  email: string;
  nameOnHeader: string;
  phoneNumber: string;
  price: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'pending' | 'completed' | 'failed';
  tripId: string;
}

interface PersonData {
  id: string;
  dob: string;
  email: string;
  firstName: string;
  imageUrlNationality: string;
  imageUrlPassport: string;
  lastName: string;
  midName: string;
  nationality: string;
  nationalityArbic: string;
  nationalityEnglish: string;
  passportNo: string;
  price: number;
}

export async function createVisaApplication(
  formData: TravelerFormData,
  paymentData: PaymentFormData
): Promise<string> {
  try {
    const visaId = uuidv4();
    
    // Validate required fields
    if (!formData.email || !formData.travelers?.length) {
      throw new Error('Missing required fields');
    }

    const visaData: VisaApplicationData = {
      id: visaId,
      cardExpiryDate: paymentData.expiry,
      cardHolderName: paymentData.cardHolderName,
      cardNumber: paymentData.cardNumber,
      country: formData.country?.name || 'not specified',
      countryArabic: formData.country?.name || 'not specified',
      createdAt: Timestamp.now(),
      cvc: paymentData.cvv,
      email: formData.email,
      nameOnHeader: `${formData.travelers[0].givenName} ${formData.travelers[0].fatherName} ${formData.travelers[0].surname}`,
      phoneNumber: formData.phoneNumber,
      price: formData.country?.price.toString() || '0',
      status: 'pending',
      paymentStatus: 'pending',
      tripId: '',
    };

    // Transaction to ensure data consistency
    await firestore.runTransaction(async (transaction) => {
      // Create visa application document
      const visaRef = firestore.collection('visa').doc(visaId);
      transaction.set(visaRef, visaData);

      // Upload images and create persons
      const personsRef = visaRef.collection('persons');

      for (const traveler of formData.travelers) {
        const personId = uuidv4();

        const personData: PersonData = {
          id: personId,
          dob: traveler.dateOfBirth,
          email: formData.email,
          firstName: traveler.givenName,
          imageUrlNationality: traveler.personalPhoto,
          imageUrlPassport: traveler.passportPhoto,
          lastName: traveler.surname,
          midName: traveler.fatherName,
          nationality: traveler.nationality,
          nationalityArbic: traveler.nationality || traveler.nationality,
          nationalityEnglish: traveler.nationality || traveler.nationality,
          passportNo: traveler.passportNumber,
          price: formData.country?.price || 0,
        };

        transaction.set(personsRef.doc(personId), personData);
      }
    });

    return visaId;
  } catch (error) {
    console.error('Visa application creation failed:', error);
    throw new Error('Failed to create visa application');
  }
} 
