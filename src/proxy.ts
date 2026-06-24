import { NextResponse, type NextRequest } from 'next/server';
import {
  getSchoolByCode,
  getSchoolByCookieValue,
  getSchoolRoute,
} from '@/app/_libs/schools';

const getSchoolCodeFromPathname = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'decrypt') {
    return segments[1];
  }
  return segments[0];
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'decrypt' && segments[1]) {
    const school = getSchoolByCode(segments[1]);
    if (school) {
      const url = request.nextUrl.clone();
      url.pathname = getSchoolRoute(school, 'decrypt');
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname === '/' ||
    pathname === '/decrypt' ||
    pathname === '/bookmarklet'
  ) {
    const selectedSchool = getSchoolByCookieValue(
      request.cookies.get('selectedSchool')?.value,
      request.cookies.get('customSchool')?.value,
    );
    const service =
      pathname === '/decrypt'
        ? 'decrypt'
        : pathname === '/bookmarklet'
          ? 'bookmarklet'
          : 'encrypt';
    const redirectPath = selectedSchool
      ? getSchoolRoute(selectedSchool, service)
      : '/settings/setup';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  const response = NextResponse.next();
  const schoolCode = getSchoolCodeFromPathname(pathname);

  if (schoolCode && getSchoolByCode(schoolCode)) {
    response.cookies.set('selectedSchool', schoolCode, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|images).*)'],
};
