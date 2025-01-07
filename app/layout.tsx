import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { FirebaseProvider } from '@/app/context/firebase-provider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TravelPro',
  description: 'Your trusted travel companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <FirebaseProvider>
              {children}
              <Toaster />
            </FirebaseProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}