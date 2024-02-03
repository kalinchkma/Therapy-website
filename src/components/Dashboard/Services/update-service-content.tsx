/** @format */

'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
	UpdateServiceContentState,
	updateServiceContent,
} from '@/actions/services-actions';
import { useFormState } from 'react-dom';

export default function UpdateServiceContent({
	id,
	currContent,
}: {
	id: number;
	currContent: string;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const [content, setContent] = useState<string>(currContent);
	const update_service_content = updateServiceContent.bind(null, id);

	const initialState: UpdateServiceContentState = { status: 100 };
	const [state, dispatch] = useFormState(update_service_content, initialState);
	const [message, setMessage] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (state.message) {
			setMessage(state.message);
		}
	}, [state]);

	useEffect(() => {
		setMessage(undefined);
	}, [open]);

	return (
		<Dialog open={open}>
			<Button variant='link' onClick={() => setOpen(true)}>
				View
			</Button>
			<DialogContent className='w-full flex flex-col max-h-[100vh] overflow-y-auto'>
				<div className='flex flex-col w-full h-auto'>
					<h3>Add service details content</h3>
					{state.status === 200 && state.message ? (
						<p className='text-green-500'>{message}</p>
					) : (
						<p className='text-red-500'>{message}</p>
					)}
				</div>

				<form
					className='w-full h-full grid grid-cols-1 md:grid-cols-3 gap-3 content-start'
					action={dispatch}>
					{/* action container */}
					<div className='flex col-span-1 md:col-span-3'>
						<Button type='submit'>Update</Button>
						<Button
							variant='secondary'
							type='button'
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</div>
					{/* input container */}
					<div className='col-span-1 flex flex-col items-start justify-start'>
						<Textarea
							defaultValue={currContent}
							className='w-full md:h-[70vh]'
							onChange={(e) => setContent(e.target.value)}
							name='content'
						/>
						{state.status === 400 && state.errors?.content && (
							<p className='text-red-500'>{state.errors.content[0]}</p>
						)}
					</div>
					{/* Preview container */}
					<div className='col-span-1 md:col-span-2 border-2 px-2'>
						<h4 className='text-zinc-800 text-xl m-0 p-0'>Preview</h4>
						<div className='w-full h-[70vh] overflow-y-auto  p-2'>
							<Markdown remarkPlugins={[remarkGfm]} className='content-preview'>
								{content}
							</Markdown>
						</div>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
