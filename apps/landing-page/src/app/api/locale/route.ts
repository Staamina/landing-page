import { NextRequest, NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';

export async function GET() {
  const locale = await getLocale();

  return NextResponse.json({ locale });
}

export async function POST(request: NextRequest) {
  const { locale } = await request.json();

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  const cookieName = 'NEXT_LOCALE';
  response.cookies.set(cookieName, locale, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  });

  return response;
}
