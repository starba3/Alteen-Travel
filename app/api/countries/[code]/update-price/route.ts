import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { firestore } from '@/lib/firebase/admin-config';

export async function PATCH(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const { price } = await request.json();

    // Validate price
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    const countrySnapshot = await firestore.collection('visaCountries').where('code', '==', code).limit(1).get();
    const countryRef = countrySnapshot.docs[0]?.ref;

    if (!countryRef) {
      throw new Error('Country not found');
    }
    
    await countryRef.update({
      price: price
    });

    const updatedDoc = await countryRef.get();
    const updatedCountry = { id: updatedDoc.id, ...updatedDoc.data() };
    revalidateTag('countries');

    return NextResponse.json(updatedCountry);
  } catch (error) {
    console.error('Error updating country price:', error);
    return NextResponse.json(
      { error: 'Failed to update country price' },
      { status: 500 }
    );
  }
} 