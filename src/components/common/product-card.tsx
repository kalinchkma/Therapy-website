/** @format */

'use client';

import Image from 'next/image';
import React from 'react';
import IconCreator from './icon-creator';
import { IconType } from '@/lib/definitions';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { ShoppingBasket } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart';

interface ProductCardProps {
	className?: string;
}

export default function ProductCard({ className }: ProductCardProps) {
	const dispatch = useAppDispatch();

	const { cartDetails } = useAppSelector((state) => state.cart);

	const add_to_cart_handler = () => {
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
		<div
			className={cn(
				'flex items-start justify-center flex-col w-full',
				className,
			)}>
			<Image
				src={'/images/service1.jpg'}
				width={400}
				height={400}
				alt='product image'
				className='min-w-[100%] min-h-[200px] object-cover border-2 border-transparent transition-all hover:border-blue-400'
			/>
			{/* product title */}
			<h4 className='text-xl text-zinc-700 font-bold mt-4 mb-2'>
				Medical Tape
			</h4>
			{/* product rate */}
			{/* <div className='flex flex-row text-yellow-400'>
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
			</div> */}
			{/* price */}
			<h5 className='text-zinc-500 font-bold text-lg my-1'>$1200</h5>
			{/* order button */}
			<div className='flex items-center justify-center w-full'>
				<Button
					onClick={add_to_cart_handler}
					type='button'
					className='bg-purple-700 hover:bg-purple-800 flex items-center justify-center gap-1'>
					Add to cart <ShoppingBasket className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
}
