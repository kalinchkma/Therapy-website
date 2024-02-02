/** @format */

'use client';

import { createNewService, FromState } from '@/actions/services-actions';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function AddNewService() {
	const initialState: FromState = {
		status: 100,
	};

	const [openModel, setOpenModel] = useState<boolean>(false);
	const [state, dispatch] = useFormState(createNewService, initialState);

	const [formStateMessage, setFormStateMessage] = useState<string>('');

	useEffect(() => {
		if (state?.status === 200) {
			(document.getElementById('name') as HTMLInputElement).value = '';
			(document.getElementById('description') as HTMLTextAreaElement).value =
				'';
			(document.getElementById('price') as HTMLInputElement).value = '';
			(document.getElementById('thumbnail') as HTMLInputElement).value = '';
		}
		if (state.message) {
			setFormStateMessage(state.message);
		}
	}, [state]);

	useEffect(() => {
		setFormStateMessage('');
	}, [openModel]);

	return (
		<Dialog open={openModel}>
			<Button className='ml-4' onClick={(e) => setOpenModel(true)}>
				Add New Service
			</Button>
			<DialogContent className='md:w-[600px] max-h-[100vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Add New Service</DialogTitle>
					{state?.status === 200 &&
						state.message &&
						formStateMessage !== '' && (
							<DialogDescription className='text-green-400'>
								{formStateMessage}
							</DialogDescription>
						)}
					{state.status === 400 && state.message && formStateMessage !== '' && (
						<DialogDescription className='text-red-400'>
							{formStateMessage}
						</DialogDescription>
					)}
				</DialogHeader>
				<form className='w-full flex flex-col gap-4' action={dispatch}>
					{/* Service name */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							name='name'
							type='text'
							required
							placeholder='Enter a name of service....'
						/>
						{state?.status === 400 && state.error?.name && (
							<p className='text-red-400'>{state.error.name[0]}</p>
						)}
					</div>
					{/* Service description */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							required
							placeholder='Enter a name of service description....'
						/>
						{state?.status === 400 && state.error?.description && (
							<p className='text-red-400'>{state.error.description[0]}</p>
						)}
					</div>

					{/* Service price */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='price'>Service price (optional)</Label>
						<Input
							id='price'
							name='price'
							type='number'
							placeholder='Enter a price of a server....'
						/>
						{state?.status === 400 && state.error?.price && (
							<p className='text-red-400'>{state.error.price[0]}</p>
						)}
					</div>
					{/* Thumbnail image */}
					<div className='flex flex-col w-full'>
						<Label htmlFor='thumbnail'>Thumbnail Image</Label>
						<Input
							id='thumbnail'
							name='thumbnail'
							type='file'
							className='mt-3'
						/>
						{state?.status === 400 && state.error?.thumbnailImage && (
							<p className='text-red-400'>{state.error.thumbnailImage[0]}</p>
						)}
					</div>

					<div className='flex w-full items-center justify-end gap-3'>
						<Button type='submit'>Create</Button>
						<Button
							type='button'
							variant='ghost'
							onClick={(e) => setOpenModel(false)}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
