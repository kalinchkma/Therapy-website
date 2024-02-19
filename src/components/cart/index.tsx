/** @format */
'use client';
import { ShoppingCart } from 'lucide-react';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart';
import Link from 'next/link';

export default function ShopCart() {
	const dispatch = useAppDispatch();

	const { cartDetails } = useAppSelector((state) => state.cart);

	// add to card
	const handler_card = () => {
		const new_cart = { ...cartDetails };
		const new_item = {
			item_id: 10,
			item_price: 99,
		};
		new_cart.items = [...new_cart.items, new_item];
		new_cart.total_price += new_item.item_price;

		dispatch(setCart(new_cart));
	};

	return (
		cartDetails.total_price > 0 &&
		cartDetails.items.length > 0 && (
			<div className='fixed bottom-[15%] right-[4%]'>
				<Link
					href='/shop/cart'
					className='relative flex items-center justify-center py-3 px-4  bg-green-600 text-white rounded-lg'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
					<ShoppingCart className='h-8 w-8' />
				</Link>
			</div>
		)
	);
}
