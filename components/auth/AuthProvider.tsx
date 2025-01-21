"use client";

import { createContext, useContext, useEffect, useState } from "react";
// import { encryptData } from "@/lib/encryption/utility";
import Cookies from 'js-cookie';
import { getStoredAuth, clearStoredAuth } from "@/lib/auth";
import { User as FirebaseUser, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FirestoreUserData } from "@/lib/types/user";


interface AuthContextType {
  user: FirebaseUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userData: FirestoreUserData | null;
  login: (user: FirebaseUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<FirestoreUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const data = userDoc.data() as FirestoreUserData;
          
          setIsAdmin(data?.isAdmin === true);
          setUserData(data);
          
          localStorage.setItem('isAdmin', String(data?.isAdmin === true));
          localStorage.setItem('userData', JSON.stringify(data));

          Cookies.set('isAdmin', String(data?.isAdmin === true));
          
          // Store auth data
          const token = await user.getIdToken();

          localStorage.setItem('authUser', JSON.stringify(user));
          localStorage.setItem('authToken', token);

          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setUserData(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        clearStoredAuth();
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const login = async (user: FirebaseUser) => {
    try {
      setUser(user);
      setIsAuthenticated(true);
      
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      const isAdminUser = userData?.isAdmin === true;
      
      setIsAdmin(isAdminUser);

      // Cookies.set('isAdmin', encryptData(String(isAdminUser)), {
      //   secure: true, // Ensure secure cookies for production
      //   sameSite: 'strict',
      // });
      
      // Store auth data
      const token = await user.getIdToken();

      localStorage.setItem('authUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAdmin', String(isAdminUser));

      Cookies.set('isAdmin', String(isAdminUser));
      // Cookies.set('authUser', encryptData(JSON.stringify(user)), {
      //   secure: true, // Ensure secure cookies for production
      //   sameSite: 'strict',
      // });

      // Cookies.set('authToken', encryptData(token), {
      //   secure: true, // Ensure secure cookies for production
      //   sameSite: 'strict',
      // });
      
    } catch (error) {
      console.error("Error setting up user session:", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "There was a problem logging in. Please try again.",
      });
    }
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);  // This will trigger onAuthStateChanged
      clearStoredAuth();
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem signing out.",
      });
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin, 
      userData,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}