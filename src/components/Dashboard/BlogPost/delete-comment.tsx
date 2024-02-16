/** @format */

import { deleteComment } from '@/actions/comments-actions';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DeleteComment({ id }: { id: number }) {
	const delete_comment = deleteComment.bind(null, id);
	return (
		<form
			className='flex items-center justify-center mt-5'
			action={delete_comment}>
			<Button variant='destructive' size='sm' type='submit'>
				Delete
			</Button>
		</form>
	);
}
