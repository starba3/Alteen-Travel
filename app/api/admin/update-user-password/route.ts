import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin-config'; // You'll need to set this up

export async function POST(request: Request) {
  try {
    const { uid, newPassword } = await request.json();
    
    await adminAuth.updateUser(uid, {
      password: newPassword,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
} 