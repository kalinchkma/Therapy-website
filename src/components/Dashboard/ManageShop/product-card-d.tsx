/** @format */

'use client';

import Image from 'next/image';
import React from 'react';
import IconCreator from '@/components/common/icon-creator';
import { IconType } from '@/lib/definitions';
import { cn } from '@/lib/utils';

import { Button } from '../../ui/button';
import { ShoppingBasket } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart';
import EditProduct from './edit-product';
import DeleteProduct from './delete-product';

interface ProductCardProps {
	product: {
		id: number;
		title: string;
		image: string;
		description: string | null;
		price: number;
	};
	className?: string;
	host: string;
}

export default function ProductCardD({
	product,
	className,
	host,
}: ProductCardProps) {
	return (
		<div
			className={cn(
				'flex items-start justify-center flex-col w-full gap-3',
				className,
			)}>
			<Image
				src={`${host}${product.image}`}
				width={300}
				height={300}
				alt='product image'
				className='min-w-[100%] h-[300px] object-cover transition-all'
			/>
			{/* product title */}
			<h4 className='text-xl text-zinc-700 font-bold mt-4 mb-2'>
				{product.title}
			</h4>
			{/* product rate */}

			{/* price */}
			<h5 className='text-zinc-500 font-bold text-lg my-1'>
				{product.price} Taka
			</h5>
			<div className='flex items-center justify-center flex-wrap'>
				<p className=' line-clamp-2'>{product.description}</p>
			</div>
			{/* order button */}
			<div className='flex items-center justify-center w-full gap-2'>
				<EditProduct product={product} host={host} />
				<DeleteProduct id={product.id} />
			</div>
		</div>
	);
}
