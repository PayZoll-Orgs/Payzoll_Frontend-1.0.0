import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login', 
  '/Features',
  '/Pricing',
  '/working',
  '/api/auth'
];

// Helper to check if path starts with any of the given prefixes
const pathStartsWith = (path: string, prefixes: string[]): boolean => {
  return prefixes.some(prefix => path === prefix || path.startsWith(`${prefix}/`));
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public routes without authentication
  if (pathStartsWith(pathname, publicRoutes)) {
    return NextResponse.next();
  }
  
  // Check for auth token
  const token = request.cookies.get('auth_token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  
  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('mode', 'login');
    return NextResponse.redirect(loginUrl);
  }
  
  try {
    // Verify token (in a real app, you'd verify the signature)
    const decoded: any = jwtDecode(token);
    
    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      // Token expired, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('mode', 'login');
      return NextResponse.redirect(loginUrl);
    }
    
    // Role-based route protection
    if (
      // Employee trying to access employer routes
      (decoded.role === 'employee' && pathname.startsWith('/employerDashboard')) ||
      // Employer trying to access employee routes
      (decoded.role === 'employer' && pathname.startsWith('/employeeDashboard'))
    ) {
      // Redirect to appropriate dashboard based on role
      const dashboardUrl = new URL(
        decoded.role === 'employee' ? '/employeeDashboard' : '/employerDashboard',
        request.url
      );
      return NextResponse.redirect(dashboardUrl);
    }
    
    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    // Invalid token, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('mode', 'login');
    return NextResponse.redirect(loginUrl);
  }
}

// Define which routes this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (images folder)
     * - public/ (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
  ],
};