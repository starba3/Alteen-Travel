import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
// import { decryptServer } from '@/lib/encryption/serverEncryption';

const locales = ['en', 'ar']

function getLocale(request: NextRequest) {
  const locale = request.cookies.get('locale')?.value
  return locale && locales.includes(locale) ? locale : 'en'
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log(pathname);
  // Check for admin routes
  if (pathname.includes('/admin') ) {
    const isAdmin =  cookies().get('isAdmin')?.value || '';
    // const isAdminDecrypted = decryptServer(isAdmin) || '';
    // console.log(isAdminDecrypted);
    // const authHeader = request.headers.get('authorization');
    // console.log(authHeader);
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  //   try {
  //     const response = await fetch(`${request.nextUrl.origin}/api/verify-admin`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ token: authHeader }),
  //     });

  //     const { isAdmin } = await response.json();
  //     if (!isAdmin) {
  //       return NextResponse.redirect(new URL('/', request.url));
  //     }
  //   } catch (error) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico).*)',
  ],
} 