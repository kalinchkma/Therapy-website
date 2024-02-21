/** @format */

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

import { Order } from './order-table';
import Image from 'next/image';

type Item = {
	item_id: number;
	item_price: number;
	amount: number;
	title: string;
	image: string;
};

export default function OrderDetails({ order }: { order: Order }) {
	const items = JSON.parse(String(order.items_list)) as Item[];
	return (
		<Dialog>
			<DialogTrigger className='bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md text-white'>
				View
			</DialogTrigger>
			<DialogContent className='max-w-full md:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Order Details</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col'>
					<h4>{order.name}</h4>
					<h5>Phone Number: {order.phone_number}</h5>
					<h5>Email: {order.email}</h5>
					<h5>Address: {order.address}</h5>
					<h5>Region: {order.region}</h5>
					<h5>Total Items: {order.total_items}</h5>
					<h5>Total Price: {order.total_price}</h5>
				</div>
				{items.map((item, index) => (
					<div className='flex flex-row gap-2 p-2 bg-zinc-50' key={index}>
						<Image src={item.image} width={100} height={100} alt='item-image' />
						<div className='flex flex-col'>
							<h4>{item.title}</h4>
							<h5>Price: {item.item_price}</h5>
							<h6>Amount: {item.amount}x</h6>
						</div>
					</div>
				))}
				<div className='flex items-center justify-center'>
					<DialogClose className='py-2 px-4 bg-zinc-400 hover:bg-zinc-500 rounded-lg text-white'>
						Close
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
