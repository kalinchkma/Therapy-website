/** @format */

import React from 'react';
import OrderTable from './order-table';
import { getAllOrder } from '@/methods/order-method';

export default async function ManageOrder() {
	const orders = await getAllOrder();
	return (
		<div className='w-full'>
			<OrderTable orders={orders} />
		</div>
	);
}
