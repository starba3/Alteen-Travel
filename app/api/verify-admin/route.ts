import { adminAuth } from '@/lib/firebase/admin-config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ isAdmin: false });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    return NextResponse.json({ isAdmin: !!decodedToken.admin });
  } catch (error) {
    return NextResponse.json({ isAdmin: false });
  }
} 