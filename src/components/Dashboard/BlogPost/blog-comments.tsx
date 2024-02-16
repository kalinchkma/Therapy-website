/** @format */
'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import React, { useState } from 'react';

import { Comment } from './blog-card-d';
import DeleteComment from './delete-comment';

export default function BlogComments({ comments }: { comments: Comment[] }) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Dialog open={open}>
			<span
				className='text-zinc-500 cursor-pointer'
				onClick={() => setOpen(true)}>
				{comments.length} comment
			</span>
			<DialogContent className='max-w-full md:max-w-[600px] h-[100vh] overflow-y-auto flex flex-col items-start justify-start'>
				<DialogHeader className='w-full'>
					<DialogTitle className='text-center'>All Comments</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className='flex w-full items-center justify-start border-b pb-5'>
					<Button onClick={() => setOpen(false)} variant='secondary'>
						Close
					</Button>
				</div>
				<div className='flex flex-col gap-3 w-full'>
					{comments.map((comment, index) => (
						<div
							className='flex flex-col p-5 rounded-md bg-zinc-200'
							key={index}>
							<h4 className='text-zinc-700'>
								<span className='text-zinc-500 font-bold'>Autor:</span>{' '}
								{comment.name}
							</h4>
							<h5 className='text-zinc-700'>
								<span className='text-zinc-500 font-bold'>Email:</span>{' '}
								{comment.email}
							</h5>
							<div className='flex flex-col text-zinc-700'>
								<h6 className='font-bold'>Comment</h6>
								<p>{comment.comment_content}</p>
							</div>
							<DeleteComment id={comment.id} />
						</div>
					))}
					{comments.length <= 0 && (
						<div className='flex items-center justify-center'>
							No comment found
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
