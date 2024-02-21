/** @format */

import { deleteOrder } from '@/actions/order-actions';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DeleteOrder({ id }: { id: number }) {
	const delete_order = deleteOrder.bind(null, id);
	return (
		<form action={delete_order}>
			<Button variant='destructive' size='sm' type='submit'>
				delete
			</Button>
		</form>
	);
}
