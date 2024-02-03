/** @format */
'use client';

import {
	updateServiceName,
	UpdateServiceNameFormState,
} from '@/actions/services-actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function UpdateServiceName({
	id,
	value,
}: {
	id: number;
	value: string;
}) {
	const [open, setOpen] = useState<boolean>(false);

	const initialState: UpdateServiceNameFormState = {
		status: 100,
	};

	const update_service_name = updateServiceName.bind(null, id);

	const [state, dispatch] = useFormState(update_service_name, initialState);

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
			<DialogContent className='max-w-[300px]'>
				<form className='w-full flex flex-col gap-4' action={dispatch}>
					{state.status === 200 && state.message && formMessage !== '' && (
						<h4 className='text-green-400'>{formMessage}</h4>
					)}
					{state.status !== 200 && state.message && formMessage !== '' && (
						<h4 className='text-red-400'>{formMessage}</h4>
					)}
					<Input type='text' name='name' defaultValue={value} />
					{state.status !== 200 && state.error && state.error.name && (
						<p className='text-red-400'>{state.error.name[0]}</p>
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
