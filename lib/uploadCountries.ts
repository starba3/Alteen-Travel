// import { db } from './firebase/config';
// import { firestore } from './firebase/admin-config';
// import { ALL_COUNTRIES } from './countries';

// // Add a lock variable at the top
// let isUploading = false;

// export async function uploadCountriesToFirebase() {
//   // Check if already running
//   if (isUploading) {
//     console.log('Upload already in progress');
//     return false;
//   }
  
//   isUploading = true;
  
//   try {
//     const countriesRef = firestore.collection("visaCountries");
//     const batch = firestore.batch();
    
//     for (const country of ALL_COUNTRIES) {
//       const querySnapshot = await countriesRef
//         .where("name", "==", country.name)
//         .get();
      
//       if (querySnapshot.empty) {
//         const docRef = countriesRef.doc();
//         batch.set(docRef, country);
//       }
//     }
    
//     await batch.commit();
    
//     console.log('Successfully uploaded countries to Firebase');
//     return true;
//   } catch (error) {
//     console.error('Error uploading countries to Firebase:', error);
//     throw error;
//   } finally {
//     // Release the lock even if there's an error
//     isUploading = false;
//   }
// }

// // You can run this function directly if needed


// export default uploadCountriesToFirebase();