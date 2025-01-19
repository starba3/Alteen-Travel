import { firestore } from '../firebase/admin-config';
import { VisaOrdersFilters } from '@/lib/types/visaOrders';
import { VisaApplication } from '@/lib/types/VisaApplication';
import { Person } from '@/lib/types/Person';
import { Query } from 'firebase-admin/firestore'; 

export type VisaOrderStatus = 'all' | 'pending' | 'approved' | 'rejected';

export async function getVisaOrders(
  page: number = 1,
  pageSize: number = 10,
  filters?: VisaOrdersFilters & { status?: VisaOrderStatus }
) {
  try {
    let query: Query = firestore.collection('visa');
    
    // Debug: Log initial query
    console.log('Initial query params:', { page, pageSize, filters });

    // Apply filters if they exist
    if (filters?.search) {
      query = query.where('email', '>=', filters.search)
                   .where('email', '<=', filters.search + '\uf8ff');
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.where('status', '==', filters.status);
    }

    // Debug: Log query after filters
    const debugSnapshot = await query.get();
    console.log('Data after filters:', debugSnapshot.size, 'documents found');
    debugSnapshot.docs.forEach(doc => {
      console.log('Document:', { id: doc.id, data: doc.data() });
    });

    // Order by createdAt
    query = query.orderBy('createdAt', 'desc');

    const snapshot = await query
      .limit(pageSize)
      .get();

    // Convert Firestore data to plain objects
    const visaOrders = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const personsSnapshot = await doc.ref.collection('persons').get();
      
      // Convert Firestore Timestamp to ISO string
      const createdAt = data.createdAt?.toDate?.() 
        ? data.createdAt.toDate().toISOString() 
        : new Date().toISOString();

      return {
        ...data,
        id: doc.id,
        createdAt,
        persons: personsSnapshot.docs.map(personDoc => ({
          ...personDoc.data(),
          id: personDoc.id,
          // Convert any Timestamp fields in persons if they exist
          dob: personDoc.data().dob?.toDate?.() 
            ? personDoc.data().dob.toDate().toISOString() 
            : personDoc.data().dob
        }))
      };
    }));

    // Debug: Log final results
    console.log('Final processed data:', {
      dataLength: visaOrders.length,
      firstItem: visaOrders[0],
      totalDocs: snapshot.size
    });

    return {
      data: visaOrders,
      pageCount: Math.ceil(snapshot.size / pageSize),
      totalCount: snapshot.size
    };

  } catch (error) {
    console.error('Error in getVisaOrders:', error);
    throw error;
  }
}

export async function getVisaOrderById(id: string) {
  try {
    const visaDoc = await firestore.collection('visa').doc(id).get();
    if (!visaDoc.exists) {
      throw new Error('Visa order not found');
    }

    const visaData = visaDoc.data() as VisaApplication;
    const personsSnapshot = await visaDoc.ref.collection('persons').get();
    
    visaData.persons = personsSnapshot.docs.map(personDoc => ({
      ...personDoc.data(),
      id: personDoc.id
    })) as Person[];

    return {
      ...visaData,
      id: visaDoc.id
    };

  } catch (error) {
    console.error('Error fetching visa order:', error);
    throw error;
  }
} 