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
    const countriesRef = firestore.collection('visaCountries');
    const snapshot = await countriesRef.get();
    
    const countries: Country[] = [];
    snapshot.forEach(doc => {
      countries.push(doc.data() as Country);
    });

    // console.log(countries);

    // Sort countries by name for consistency
    return countries.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching countries from Firebase:', error);
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