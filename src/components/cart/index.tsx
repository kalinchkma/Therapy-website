/** @format */
'use client';
import { ShoppingCart } from 'lucide-react';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart';

import { Button } from '../ui/button';

export default function ShopCart() {
	const { cartDetails } = useAppSelector((state) => state.cart);

	return (
		cartDetails.items.length > 0 && (
			<div className='fixed bottom-[15%] right-[4%]'>
				<Button className='relative flex items-center justify-center py-3 px-4  bg-green-600 text-white rounded-lg'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
					<ShoppingCart className='h-8 w-8' />
				</Button>
			</div>
		)
	);
}
