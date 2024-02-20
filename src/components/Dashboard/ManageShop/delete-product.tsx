/** @format */
'use client';
import { deleteProduct } from '@/actions/product-actions';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DeleteProduct({ id }: { id: number }) {
	const delete_product = deleteProduct.bind(null, id);

	return (
		<form action={delete_product}>
			<Button type='submit' variant='destructive'>
				Delete
			</Button>
		</form>
	);
}
