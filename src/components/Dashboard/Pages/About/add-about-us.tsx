/** @format */
'use client';
import { updateAbout, AboutWriteState } from '@/actions/page-banner-actions';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Markdown from 'react-markdown';

export default function AddAboutUs({ about }: { about?: string }) {
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [content, setContent] = useState<string | undefined>(undefined);
	const initialState: AboutWriteState = { status: 100 };
	const [state, dispatch] = useFormState(updateAbout, initialState);

	useEffect(() => {
		if (state.message) {
			setMessage(state.message);
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<button
				className='flex py-2 px-4 bg-zinc-900 hover:bg-zinc-800 text-white justify-center items-center'
				onClick={() => setOpen(true)}>
				View/Write About
			</button>
			<DialogContent className='h-[100vh] w-full overflow-y-auto flex items-start justify-start flex-col'>
				<h1 className='text-center font-semibold text-xl'>View/Write About</h1>
				{state.message && state.status == 200 && (
					<p className='text-green-500'>{message}</p>
				)}
				{state.message && state.status == 500 && (
					<p className='text-red-500'>{message}</p>
				)}
				<div className='w-full grid grid-cols-1 lg:grid-cols-5 gap-5'>
					<div className='col-span-1 lg:col-span-2'>
						<form
							className='w-full flex flex-col items-end justify-end gap-5'
							action={dispatch}>
							<Textarea
								onChange={(e) => setContent(e.target.value)}
								className='h-[300px] md:h-[400px]'
								name='content'
								defaultValue={about}
							/>
							<div className='flex items-end justify-end gap-2'>
								<Button
									type='button'
									variant='secondary'
									onClick={() => {
										setContent(undefined);
										setMessage('');
										setOpen(false);
									}}>
									Close
								</Button>
								<Button type='submit'>Update</Button>
							</div>
						</form>
					</div>
					<div className=' col-span-1 lg:col-span-3'>
						<Markdown className='blog-content'>
							{about && !content ? about : content}
						</Markdown>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
