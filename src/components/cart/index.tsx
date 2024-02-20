/** @format */
'use client';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCart } from '@/store/cart';

import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function ShopCart() {
	const [open, setOpen] = useState<boolean>(false);

	const { cartDetails } = useAppSelector((state) => state.cart);

	useEffect(() => {
		console.log(cartDetails);
	}, [cartDetails]);

	return (
		cartDetails.items.length > 0 && (
			<div className='fixed bottom-[15%] right-[4%]'>
				<Dialog open={open}>
					<Button
						onClick={() => setOpen(true)}
						size={'icon'}
						className='relative flex items-center justify-center  bg-green-600 hover:bg-green-700 text-white rounded-lg'>
						<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
						<span className='flex items-center justify-center absolute top-[-10px] right-0 p-1 bg-purple-700 rounded-full'>
							{cartDetails.items.length}
						</span>
						<ShoppingCart className='h-6 w-6' />
					</Button>

					<DialogContent className='w-full h-[100vh] overflow-y-auto flex flex-col items-start justify-start'>
						<DialogHeader className='w-full'>
							<DialogTitle className='text-center text-2xl'>
								Your Cart
							</DialogTitle>
							<DialogDescription className='text-center'>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</DialogDescription>
						</DialogHeader>
						<div className='h-full w-full grid grid-cols-1 md:grid-cols-2'>
							{/* all card items */}
							<div className=' flex flex-col h-full col-span-1 p-4 overflow-y-auto gap-3'>
								<h4 className='flex items-center justify-center col-span-1 font-bold text-xl'>
									Total price: {cartDetails.total_price}
								</h4>
								{cartDetails.items.map((item, index) => (
									<div
										className='flex flex-row gap-2 p-2 bg-zinc-50'
										key={index}>
										<Image
											src={item.image}
											width={100}
											height={100}
											alt='item-image'
										/>
										<div className='flex flex-col'>
											<h4>{item.title}</h4>
											<h5>Price: {item.item_price}</h5>
											<h6>Amount: {item.amount}x</h6>
										</div>
									</div>
								))}
							</div>
							{/* ordered details */}
							<div className='flex w-full col-span-1'>
								{/* order form */}
								<form className='w-full flex flex-col gap-3 p-4'>
									<h4 className='flex items-center justify-center pb-4 text-zinc-900 font-bold text-lg uppercase'>
										Fill your order details
									</h4>
									<div className='flex flex-col gap-2'>
										<Label htmlFor='phone-number'>Phone number</Label>
										<Input
											type='text'
											id='phone-number'
											name='phone-number'
											placeholder='Enter your phone number...'
										/>
										<p className='text-red-400'></p>
									</div>
									<div className='flex flex-col gap-2'>
										<Label htmlFor='email'>Email (optional)</Label>
										<Input
											type='email'
											name='email'
											id='email'
											placeholder='Enter your email...'
										/>
										<p className='text-red-400'></p>
									</div>
									<div className='flex flex-col gap-2'>
										<Label htmlFor='address'>Address</Label>
										<Textarea
											id='address'
											name='address'
											placeholder='Enter your address...'
										/>
										<p className='text-red-400'></p>
									</div>
									<div className='flex items-center justify-center'>
										<Button
											type='submit'
											className='bg-green-800 hover:bg-green-900 flex gap-1'>
											Order <ShoppingCart className='h-4 w-4' />
										</Button>
										<Button
											type='button'
											onClick={() => setOpen(false)}
											variant={'secondary'}>
											Close
										</Button>
									</div>
								</form>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		)
	);
}
