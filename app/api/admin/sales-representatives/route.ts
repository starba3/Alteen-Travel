import { adminAuth } from '@/lib/firebase/admin-config';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const usersSnapshot = await adminAuth.listUsers();
    
    const users = usersSnapshot.users.map(user => ({
      ...user.toJSON(),
      uId: user.uid,
    }));
    
    console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching sales representatives:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales representatives' },
      { status: 500 }
    );
  }
} 