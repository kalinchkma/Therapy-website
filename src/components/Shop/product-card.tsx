/** @format */

'use client';

import Image from 'next/image';
import React from 'react';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { ShoppingBasket } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart';

interface ProductCardProps {
	product: {
		id: number;
		description: string | null;
		title: string;
		image: string;
		price: number;
	};
	host: string;
	className?: string;
}

export default function ProductCard({
	product,
	className,
	host,
}: ProductCardProps) {
	const dispatch = useAppDispatch();

	const { cartDetails } = useAppSelector((state) => state.cart);

	const add_to_cart_handler = () => {
		const new_cart = structuredClone(cartDetails);

		let already_in_cart: boolean = false;
		new_cart.items.forEach((item, index) => {
			if (item.item_id === product.id) {
				new_cart.items[index].amount += 1;
				new_cart.total_price += product.price;
				new_cart.total_items += 1;
				already_in_cart = true;
			}
		});

		if (!already_in_cart) {
			const new_item = {
				item_id: product.id,
				item_price: product.price,
				title: product.title,
				image: product.image,
				amount: 1,
			};

			new_cart.items = [...new_cart.items, new_item];
			new_cart.total_price += new_item.item_price;
			new_cart.total_items += 1;
			dispatch(setCart(new_cart));
		} else {
			dispatch(setCart(new_cart));
		}
	};

	return (
		<div
			className={cn(
				'flex items-start justify-center flex-col w-full',
				className,
			)}>
			<Image
				src={`${host}${product.image}`}
				width={400}
				height={400}
				alt='product image'
				className='min-w-[100%] min-h-[200px] object-cover border-2 border-transparent transition-all hover:border-blue-400'
			/>
			{/* product title */}
			<h4 className='text-xl text-zinc-700 font-bold mt-4 mb-2'>
				{product.title}
			</h4>
			{/* product rate */}
			{/* <div className='flex flex-row text-yellow-400'>
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
				<IconCreator icon={IconType.Star} />
			</div> */}
			{/* price */}
			<h5 className='text-zinc-500 font-bold text-lg my-1'>
				{product.price} Taka
			</h5>
			{/* order button */}
			<div className='flex items-center justify-center w-full'>
				<Button
					onClick={add_to_cart_handler}
					type='button'
					className='bg-blue-700 hover:bg-blue-800 flex items-center justify-center gap-1'>
					<ShoppingBasket className='h-4 w-4' /> Add to cart
				</Button>
			</div>
		</div>
	);
}
