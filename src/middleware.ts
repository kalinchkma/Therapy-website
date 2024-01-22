/** @format */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthTokenName } from './lib/definitions';

export async function middleware(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith('/login') ||
		request.nextUrl.pathname.startsWith('/signup')
	) {
		const auth = request.cookies.has(AuthTokenName);
		if (auth) {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
	}

	if (request.nextUrl.pathname.startsWith('/dashboard')) {
		const auth = request.cookies.has(AuthTokenName);
		if (!auth) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
