/** @format */
'use client';

import {
	UpdateServiceDescriptionFormState,
	updateServiceDescription,
} from '@/actions/services-actions';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function UpdateServiceDescription({
	id,
	value,
}: {
	id: number;
	value: string;
}) {
	const [open, setOpen] = useState<boolean>(false);

	const initialState: UpdateServiceDescriptionFormState = {
		status: 100,
	};

	const update_service_description = updateServiceDescription.bind(null, id);

	const [state, dispatch] = useFormState(
		update_service_description,
		initialState,
	);

	const [formMessage, setFormMessage] = useState<string>('');

	useEffect(() => {
		if (state.message) {
			setFormMessage(state.message);
		}
	}, [state]);

	useEffect(() => {
		setFormMessage('');
	}, [open]);

	return (
		<Dialog open={open}>
			<Button size='sm' variant='link' onClick={() => setOpen(true)}>
				Edit
			</Button>
			<DialogContent className='max-w-[500px]'>
				<form className='w-full flex flex-col gap-4' action={dispatch}>
					{state.status === 200 && state.message && formMessage !== '' && (
						<h4 className='text-green-400'>{formMessage}</h4>
					)}
					{state.status !== 200 && state.message && formMessage !== '' && (
						<h4 className='text-red-400'>{formMessage}</h4>
					)}
					<Textarea
						name='description'
						defaultValue={value}
						className='max-h-80 min-h-48'
					/>
					{state.status !== 200 && state.error && state.error.description && (
						<p className='text-red-400'>{state.error.description[0]}</p>
					)}
					<div className='w-full flex flex-row gap-3 justify-end'>
						<Button type='submit' size='sm' variant='default'>
							Update
						</Button>
						<Button
							type='button'
							size='sm'
							variant='ghost'
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
