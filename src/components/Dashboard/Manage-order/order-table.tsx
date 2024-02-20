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

type Order = {
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
						<TableCell>{o.name}</TableCell>
						<TableCell>{o.phone_number}</TableCell>
						<TableCell>{o.email}</TableCell>
						<TableCell>{o.total_items}</TableCell>
						<TableCell>{o.total_price}</TableCell>
						<TableCell>
							<p className='line-clamp-2'>{o.address}</p>
						</TableCell>
						<TableCell>{o.region}</TableCell>
						<TableCell>
							<div className='flex flex-wrap gap-1'>
								<Button className='bg-green-500 hover:bg-green-700' size='sm'>
									View
								</Button>
								<Button variant='destructive' size='sm'>
									delete
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
