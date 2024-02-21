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
import { Shipping_cost } from '@/app/layout';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useFormState } from 'react-dom';
import { OrderFormState, placeOrder } from '@/actions/order-actions';

export default function ShopCart({
	shipping_cost,
}: {
	shipping_cost: Shipping_cost;
}) {
	const dispatch = useAppDispatch();
	const { cartDetails } = useAppSelector((state) => state.cart);
	const [open, setOpen] = useState<boolean>(false);

	// remove item form cart
	const removeItem = (id: number) => {
		const new_cart = structuredClone(cartDetails);

		// filter cart
		const new_items = new_cart.items.filter((item) => {
			if (item.item_id === id) {
				new_cart.total_items -= item.amount;
				new_cart.total_price -= item.item_price * item.amount;

				return false;
			}
			return true;
		});
		new_cart.items = new_items;

		dispatch(setCart(new_cart));
	};

	// form state
	const initialState: OrderFormState = { status: 100 };
	const [state, dispatch_f] = useFormState(placeOrder, initialState);

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
							{cartDetails.total_items}
						</span>
						<ShoppingCart className='h-6 w-6' />
					</Button>

					<DialogContent className='w-full h-[100vh] overflow-y-auto flex flex-col items-start justify-start'>
						<DialogHeader className='w-full'>
							<DialogTitle className='text-center text-2xl'>
								Your Cart
							</DialogTitle>
						</DialogHeader>
						<div className='h-full w-full grid grid-cols-1 md:grid-cols-2'>
							{state.status === 200 ? (
								<div className='md:col-span-2 col-span-1 flex flex-col items-center justify-center'>
									<h4 className='text-green-500'>{state.message}</h4>
									<h5 className='text-blue-500'>
										Total Cost with shipping {state.total_cost} Taka
									</h5>
									<Button
										type='button'
										onClick={() => {
											setOpen(false);
											if (state.status === 200) {
												const new_cart = structuredClone(cartDetails);
												new_cart.items = [];
												new_cart.total_items = 0;
												new_cart.total_price = 0;
												dispatch(setCart(new_cart));
											}
										}}
										variant={'default'}>
										Close
									</Button>
								</div>
							) : (
								<>
									{/* all card items */}
									<div className=' flex flex-col h-full col-span-1 p-4 overflow-y-auto gap-3'>
										<h4 className='flex items-center justify-center col-span-1 font-bold text-xl'>
											Total price: {cartDetails.total_price}
										</h4>
										{cartDetails.items.map((item, index) => (
											<div
												className='flex flex-row gap-2 p-2 bg-zinc-50'
												key={index}>
												<div className='flex items-center gap-2'>
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
												<div className='flex flex-col flex-grow items-center justify-center'>
													<Button
														variant={'destructive'}
														onClick={() => removeItem(item.item_id)}>
														Remove
													</Button>
												</div>
											</div>
										))}
									</div>
									{/* ordered details */}
									<div className='flex w-full col-span-1'>
										{/* order form */}
										<form
											className='w-full flex flex-col gap-3 p-4'
											action={dispatch_f}>
											<h4 className='flex items-center justify-center pb-4 text-zinc-900 font-bold text-lg uppercase'>
												Fill your order details
											</h4>
											{state.status === 500 && state.message && (
												<p className='text-red-500'>{state.message}</p>
											)}
											{state.status === 400 &&
												(state.errors?.items ||
													state.errors?.total_items ||
													state.errors?.total_price) && (
													<p className='text-red-500'>
														Client side error, try to reload
													</p>
												)}
											{/*
									-------------------------------------------
									hidden inputs 
									-------------------------------------------
									*/}
											<input
												type='hidden'
												name='total-price'
												defaultValue={cartDetails.total_price}
											/>
											<input
												type='hidden'
												name='total-items'
												defaultValue={cartDetails.total_items}
											/>
											<input
												type='hidden'
												name='items'
												defaultValue={JSON.stringify(cartDetails.items)}
											/>
											{/* ----------------------- */}
											<div className='flex flex-col gap-2'>
												<Label htmlFor='name'>Name</Label>
												<Input
													type='text'
													id='name'
													name='name'
													placeholder='Enter your name...'
													required
												/>
												{state.errors?.name && (
													<p className='text-red-400'>{state.errors.name[0]}</p>
												)}
											</div>
											<div className='flex flex-col gap-2'>
												<Label htmlFor='phone-number'>Phone number</Label>
												<Input
													type='text'
													id='phone-number'
													name='phone-number'
													placeholder='Enter your phone number...'
													required
												/>
												{state.errors?.phone_number && (
													<p className='text-red-400'>
														{state.errors.phone_number[0]}
													</p>
												)}
											</div>
											<div className='flex flex-col gap-2'>
												<Label htmlFor='email'>Email (optional)</Label>
												<Input
													type='email'
													name='email'
													id='email'
													placeholder='Enter your email...'
												/>
												{state.errors?.email && (
													<p className='text-red-400'>
														{state.errors.email[0]}
													</p>
												)}
											</div>
											<div className='flex flex-col gap-2'>
												<Label htmlFor='address'>Address</Label>
												<Textarea
													id='address'
													name='address'
													placeholder='Enter your address...'
													required
												/>
												{state.errors?.address && (
													<p className='text-red-400'>
														{state.errors.address[0]}
													</p>
												)}
											</div>
											<div className='flex flex-col gap-2'>
												<h4>Select Region</h4>
												<RadioGroup
													defaultValue='dhaka'
													name='region'
													required
													className='flex flex-wrap gap-4'>
													<div className='flex items-center space-x-2'>
														<RadioGroupItem value='dhaka' id='dhaka' />
														<Label htmlFor='dhaka'>
															Inside Dhaka{' '}
															<span className='font-bold text-lg text-blue-600'>
																{'('}
																{shipping_cost.dhaka}
																Taka {')'}
															</span>{' '}
														</Label>
													</div>
													<div className='flex items-center space-x-2'>
														<RadioGroupItem
															value='outside_dhaka'
															id='outside-dhaka'
														/>
														<Label htmlFor='outside-dhaka'>
															Outside Dhaka{' '}
															<span className='font-bold text-lg text-blue-600'>
																{'('}
																{shipping_cost.outside_dhaka}
																Taka{')'}
															</span>{' '}
														</Label>
													</div>
												</RadioGroup>
												{state.errors?.region && (
													<p className='text-red-400'>
														{state.errors.region[0]}
													</p>
												)}
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
								</>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		)
	);
}
