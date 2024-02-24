/** @format */

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UsersType } from '@/lib/definitions';
import { checkAndGetAuth } from '@/lib/helper_function';

import { cn } from '@/lib/utils';
import ShopCart from '@/components/cart';
import Provider from '@/store/Provider';
import { getInformations } from '@/methods/information-method';

import { Toaster } from '@/components/ui/toaster';

const nunito = Nunito({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Universal Physiotherapy & Rehab Center',
	description: 'This website created by Universal Physiotherapy & Rehab center',
};

export type Shipping_cost = {
	dhaka: number;
	outside_dhaka: number;
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

	const informations = await getInformations();
	let shipping_cost: Shipping_cost = { dhaka: 0, outside_dhaka: 0 };
	if (informations.length > 0) {
		shipping_cost = JSON.parse(
			String(informations[0].product_shipping_charge),
		) as Shipping_cost;
	}
	return (
		<Provider>
			<html lang='en'>
				<body className={cn(nunito.className, 'relative')}>
					<Header
						auth={hasAuth}
						authType={userType}
						informations={informations}
					/>
					{children}
					{informations.length > 0 && <Footer informations={informations} />}
					<ShopCart shipping_cost={shipping_cost} />
					<Toaster />
				</body>
			</html>
		</Provider>
	);
}
