/** @format */
'use client';
import React, { useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { ActionButtonStyles } from '../common/action-button';
import { postComments, FormState } from '@/actions/comments-actions';
import { useFormState } from 'react-dom';

export default function BlogComment({ blog_id }: { blog_id: number }) {
	const post_comment = postComments.bind(null, blog_id);
	const initalState: FormState = { status: 100 };
	const [state, dispatch] = useFormState(post_comment, initalState);

	useEffect(() => {
		if (state.status === 200) {
			(document.getElementById('comment-form') as HTMLFormElement).reset();
		}
	}, [state]);

	return (
		<form
			className='flex flex-col gap-4 pt-7 border-t mt-7'
			action={dispatch}
			id='comment-form'>
			<h4 className='text-zinc-900 font-bold text-xl'>
				Leave comment (comment must be within 400 words)
			</h4>
			{state.status === 400 && <p className='text-red-400'>{state.message}</p>}
			{state.status === 200 && (
				<p className='text-green-400'>{state.message}</p>
			)}
			<div className='flex flex-col'>
				<Textarea
					placeholder='Write your comment...'
					name='comment'
					className='h-[200px]'
				/>
				{state.errors?.comment && (
					<p className='text-red-400'>{state.errors.comment}</p>
				)}
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='flex flex-col'>
					<Input
						type='text'
						name='name'
						placeholder='Enter your name'
						className='py-6'
					/>
					{state.errors?.name && (
						<p className='text-red-400'>{state.errors.name}</p>
					)}
				</div>
				<div className='flex flex-col'>
					<Input
						type='text'
						name='email'
						placeholder='Enter your email....'
						className='py-6'
					/>
					{state.errors?.email && (
						<p className='text-red-400'>{state.errors.email}</p>
					)}
				</div>
			</div>
			<div className='flex justify-end items-center'>
				<button type='submit' className={ActionButtonStyles}>
					Post Comment
				</button>
			</div>
		</form>
	);
}
