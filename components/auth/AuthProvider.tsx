"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getStoredAuth, clearStoredAuth } from "@/lib/auth";
import type { User } from "@/lib/types/user";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const { user, token } = getStoredAuth();
        
        if (user && token) {
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "There was a problem with your session. Please sign in again.",
        });
        clearStoredAuth();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [toast]);

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearStoredAuth();
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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