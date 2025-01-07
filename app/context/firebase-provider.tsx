'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../../lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import type { FirebaseUser } from '@/lib/types/firebaseUser';

interface FirebaseContextType {
  user: User | null;
  userData: FirebaseUser | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  userData: null,
  loading: true
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as FirebaseUser);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, userData, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext); 