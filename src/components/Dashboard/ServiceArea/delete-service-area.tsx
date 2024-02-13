/** @format */
'use client';
import { deleteServiceArea } from '@/actions/service-area-actions';

import { Button } from '@/components/ui/button';
import React from 'react';

export default function DeleteServiceArea({ id }: { id: number }) {
	const delete_service_area = deleteServiceArea.bind(null, id);
	return (
		<>
			<form action={delete_service_area}>
				<Button type='submit' variant='destructive'>
					Delete
				</Button>
			</form>
		</>
	);
}
