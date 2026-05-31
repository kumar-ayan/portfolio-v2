import { NextRequest, NextResponse } from 'next/server';

// ========================================
// Next.js Edge Middleware
// Runs before every request — lightweight security layer
// ========================================

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Block common scanner/bot paths ---
  const blockedPaths = [
    '/.env',
    '/.git',
    '/wp-admin',
    '/wp-login',
    '/phpmyadmin',
    '/admin',
    '/.htaccess',
    '/etc/passwd',
  ];

  if (blockedPaths.some((p) => pathname.startsWith(p))) {
    return new NextResponse(null, { status: 404 });
  }

  // --- Restrict API routes to safe HTTP methods ---
  if (pathname.startsWith('/api/')) {
    const allowedMethods = ['GET', 'HEAD', 'OPTIONS'];
    if (!allowedMethods.includes(req.method)) {
      return new NextResponse('Method not allowed', {
        status: 405,
        headers: { Allow: allowedMethods.join(', ') },
      });
    }
  }

  // --- Remove powered-by header (set in next.config but belt-and-suspenders) ---
  const res = NextResponse.next();
  res.headers.delete('X-Powered-By');

  return res;
}

export const config = {
  // Run middleware on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
