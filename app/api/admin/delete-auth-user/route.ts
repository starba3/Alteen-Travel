import { adminAuth } from '@/lib/firebase/admin-config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { uid } = await request.json();
    
    try {
      // First check if the user exists
      await adminAuth.getUser(uid);
      // If user exists, delete them
      await adminAuth.deleteUser(uid);
    } catch (error: any) {
      // If user doesn't exist in Auth, that's okay - continue
      if (error.code === 'auth/user-not-found') {
        return NextResponse.json({ 
          success: true, 
          message: 'User not found in Auth, proceeding with update' 
        });
      }
      throw error; // Re-throw if it's a different error
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete-auth-user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user from authentication' },
      { status: 500 }
    );
  }
} 