import { storage } from '@/lib/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (url.includes('firebasestorage.googleapis.com')) {
      const path = url.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(path);
      const storageRef = ref(storage, decodedPath);
      const downloadUrl = await getDownloadURL(storageRef);
      
      const response = await fetch(downloadUrl);
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      
      return NextResponse.json({ base64: `data:image/jpeg;base64,${base64}` });
    }
    
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
} 