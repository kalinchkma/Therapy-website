/** @format */

import { deleteMessage } from '@/actions/send-message-actions';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DeleteMessage({ id }: { id: number }) {
	const delete_message = deleteMessage.bind(null, id);
	return (
		<form action={delete_message}>
			<Button type='submit' variant={'destructive'}>
				Delete
			</Button>
		</form>
	);
}
