import { NextResponse } from 'next/server';
import { firestore } from '@/lib/firebase/admin-config';
import { revalidateTag } from 'next/cache';

export async function PATCH(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const { serviceAvailable } = await request.json();

    const countrySnapshot = await firestore.collection('visaCountries').where('code', '==', code).limit(1).get();
    const countryRef = countrySnapshot.docs[0]?.ref;
    if (!countryRef) {
      throw new Error('Country not found');
    }
    await countryRef.update({
      serviceAvailable: serviceAvailable
    });

    const updatedDoc = await countryRef.get();
    const updatedCountry = { id: updatedDoc.id, ...updatedDoc.data() };
    revalidateTag('countries');

    return NextResponse.json(updatedCountry);
  } catch (error) {
    console.error('Error updating country status:', error);
    return NextResponse.json(
      { error: 'Failed to update country status' },
      { status: 500 }
    );
  }
} 