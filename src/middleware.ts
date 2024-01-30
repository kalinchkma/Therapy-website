/** @format */

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { AuthTokenName, UsersType } from './lib/definitions';
import { checkAndGetAuth } from './lib/helper_function';
import { verify_auth_token } from './lib/utils';
import { User } from './lib/definitions';

export async function middleware(request: NextRequest) {
	if (
		request.nextUrl.pathname.startsWith('/login') ||
		request.nextUrl.pathname.startsWith('/signup')
	) {
		const auth = request.cookies.has(AuthTokenName);
		if (auth) {
			const authUser = await verify_auth_token(
				request.cookies.get(AuthTokenName)?.value!,
			);
			if (authUser) {
				const authUserDetails = authUser as User;
				if (authUserDetails.user_type === UsersType.admin) {
					return NextResponse.redirect(new URL('/dashboard', request.url));
				} else {
					return NextResponse.redirect(new URL('/profile', request.url));
				}
			}
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
