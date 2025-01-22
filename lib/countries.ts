import { unstable_cache } from 'next/cache';
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
export const getAllCountries = unstable_cache(
  async (): Promise<Country[]> => {
    try {
      // console.log('Starting getAllCountries fetch...');
      
      const countriesRef = firestore.collection('visaCountries');
      // console.log('Collection reference created');
      
      const snapshot = await countriesRef.get();
      // console.log('Snapshot received, size:', snapshot.size);
      
      const countries: Country[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        // console.log('Document data:', data);
        countries.push(data as Country);
      });

      // console.log('Total countries fetched:', countries.length);

      return countries.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      // console.error('Error fetching countries:', error);
      throw error;
    }
  },
  ['countries'],
  { revalidate: 21600 } // Cache for 6 hours
);

// Remove client-side caching as it won't work with admin SDK
export async function getCountries(): Promise<Country[]> {
  return getAllCountries();
}

// Export a promise that resolves to the countries array
// export const ALL_COUNTRIES: Promise<Country[]> = getAllCountries();
// export const ALL_COUNTRIES: Country[] = getAllCountries();