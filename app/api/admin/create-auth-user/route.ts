import { adminAuth } from '@/lib/firebase/admin-config';
import { UserRecord } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    let uid: string;
    if (!password) {
      const userRecord = await adminAuth.getUserByEmail(email);
      uid = userRecord.uid;
    } else {
      const userRecord = await adminAuth.createUser({
        email: email,
        password: password,
      });
      
      uid = userRecord.uid;
    }


    return NextResponse.json({ 
      success: true,
      uid: uid 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user in authentication' },
      { status: 500 }
    );
  }
} 