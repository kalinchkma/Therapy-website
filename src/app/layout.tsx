/** @format */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/Header/admin-header';
import { cookies } from 'next/headers';
import { AuthTokenName, UsersType } from '@/lib/definitions';
import { verify_auth_token, verify_auth_token2 } from '@/lib/utils';
import { getUserByEmail } from '@/methods/users';
import ClientHeader from '@/components/Header/client-header';

const nunito = Nunito({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Universal Physiotherapy & Rehab Center',
	description: 'This website created by Universal Physiotherapy & Rehab center',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	const authToken = cookieStore.has(AuthTokenName);
	let userType: UsersType = UsersType.client;
	if (authToken) {
		const token = await verify_auth_token(
			cookieStore.get(AuthTokenName)?.value!,
		);
		const a_token = token as { name: string; email: string; iat: number };
		const getLoggedInUser = await getUserByEmail(a_token.email);
		if (getLoggedInUser?.user_type === UsersType.admin) {
			userType = UsersType.admin;
		} else if (getLoggedInUser?.user_type === UsersType['team-member']) {
			userType = UsersType['team-member'];
		}
	}

	return (
		<html lang='en'>
			<body className={nunito.className}>
				{userType === UsersType.admin && <AdminHeader />}
				<Header auth={true} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
