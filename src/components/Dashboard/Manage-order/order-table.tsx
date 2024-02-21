/** @format */
import React from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import OrderDetails from './order-details';
import DeleteOrder from './delete-order';

export type Order = {
	id: number;
	name: string;
	email: string | null;
	total_price: number;
	total_items: number;
	items_list: unknown;
	phone_number: string;
	address: string;
	region: string;
};

export default function OrderTable({ orders }: { orders: Order[] }) {
	return (
		<Table>
			<TableCaption>A list of order.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Phone Number</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Total Items</TableHead>
					<TableHead>Total Price</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Region</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((o, index) => (
					<TableRow key={index}>
						<TableCell>
							<p className='flex flex-wrap line-clamp-2'>{o.name}</p>
						</TableCell>
						<TableCell>
							<p className='flex flex-wrap line-clamp-2'>{o.phone_number}</p>
						</TableCell>
						<TableCell>
							<p className='flex flex-wrap line-clamp-2'>{o.email}</p>
						</TableCell>
						<TableCell>
							<p className='flex flex-wrap line-clamp-2'>{o.total_items}</p>
						</TableCell>
						<TableCell>
							<p className='flex flex-wrap line-clamp-2'>{o.total_price}</p>
						</TableCell>
						<TableCell>
							<p className='line-clamp-2 flex flex-wrap'>{o.address}</p>
						</TableCell>
						<TableCell>
							{' '}
							<p className='line-clamp-2 flex flex-wrap'>{o.region}</p>
						</TableCell>
						<TableCell>
							<div className='flex flex-wrap gap-1'>
								<OrderDetails order={o} />
								<DeleteOrder id={o.id} />
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
