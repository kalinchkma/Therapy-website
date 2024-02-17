/** @format */

import { deleteCustomerReview } from '@/actions/customer-review-actions';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DeleteCustomerReview({ id }: { id: number }) {
	const delete_crv = deleteCustomerReview.bind(null, id);
	return (
		<form action={delete_crv}>
			<Button variant='destructive' type='submit'>
				Delete
			</Button>
		</form>
	);
}
