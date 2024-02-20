/** @format */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UsersType } from '@/lib/definitions';
import { checkAndGetAuth } from '@/lib/helper_function';
import StoreProvider from '../store/StoreProvider';
import { cn } from '@/lib/utils';
import ShopCart from '@/components/cart';
import Provider from '@/store/Provider';

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
	let userType: UsersType = UsersType.client;
	let hasAuth = false;
	const auth = await checkAndGetAuth();
	if (auth !== '/login' && auth !== '/404') {
		hasAuth = true;
		userType = auth.user_type as UsersType;
	}

	return (
		<Provider>
			<html lang='en'>
				<body className={cn(nunito.className, 'relative')}>
					<Header auth={hasAuth} authType={userType} />
					{children}
					<Footer />
					<ShopCart />
				</body>
			</html>
		</Provider>
	);
}
