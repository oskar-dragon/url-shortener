/* eslint-disable consistent-return */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|profile|links).*)'],
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/') || req.nextUrl.pathname === '/') {
    return;
  }
  const slug = req.nextUrl.pathname.split('/').pop();

  const fetchSlug = await fetch(`${req.nextUrl.origin}/api/get-link/${slug}`);

  if (fetchSlug.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await fetchSlug.json();

  if (!data?.active) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  if (data?.longUrl) {
    return NextResponse.redirect(data.longUrl);
  }
}
