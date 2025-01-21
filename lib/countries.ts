import { cache } from 'react'
import { firestore } from "./firebase/admin-config";

export interface Country {
  code: string;
  name: string;
  flag: string;
  price: number;
  processingTime: string;
  serviceAvailable?: boolean; // Make this optional since it's not always used
}

// Make this a server-side function with React cache
export const getAllCountries = cache(async (): Promise<Country[]> => {
  try {
    console.log('Starting getAllCountries fetch...');
    
    const countriesRef = firestore.collection('visaCountries');
    console.log('Collection reference created');
    
    const snapshot = await countriesRef.get();
    console.log('Snapshot received, size:', snapshot.size);
    
    const countries: Country[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('Document data:', data);
      countries.push(data as Country);
    });

    console.log('Total countries fetched:', countries.length);

    return countries.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error: any) {
    console.error('Detailed error in getAllCountries:', {
      error,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
});

// Remove client-side caching as it won't work with admin SDK
export async function getCountries(): Promise<Country[]> {
  return getAllCountries();
}

// Export a promise that resolves to the countries array
// export const ALL_COUNTRIES: Promise<Country[]> = getAllCountries();
// export const ALL_COUNTRIES: Country[] = getAllCountries();