// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session-token')?.value;
  const { pathname } = req.nextUrl;

  const authRoutes = ['/login', '/register', '/serial'];
  const protectedRoutes = ['/dashboard', '/game'];

  // ---- LÓGICA PARA USUÁRIO DESLOGADO ----
  if (!token && protectedRoutes.some(path => pathname.startsWith(path))) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ---- LÓGICA PARA USUÁRIO LOGADO ----
  if (token) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }


    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', 
    '/login',
    '/register',
    '/serial',
    '/dashboard/:path*',
    '/game/:path*',
  ],
}