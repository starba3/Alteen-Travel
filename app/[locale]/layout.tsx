import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { FirebaseProvider } from './context/firebase-provider';
import { cookies } from 'next/headers';
import type { Language } from '@/lib/i18n/translations';


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
  const cookieStore = cookies();
  const defaultLanguage = (cookieStore.get('language')?.value as Language) || 'en';

  return (
    <html lang={defaultLanguage} dir={defaultLanguage === 'ar' ? 'rtl' : 'ltr'}>
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