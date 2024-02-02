/** @format */

'use client';

import { createNewService } from '@/actions/services-actions';
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
import React, { useState } from 'react';
import { useFormState } from 'react-dom';

export default function AddNewService() {
	const [openModel, setOpenModel] = useState<boolean>(false);

	const [state, dispatch] = useFormState(createNewService, undefined);

	return (
		<Dialog open={openModel}>
			<Button className='ml-4' onClick={(e) => setOpenModel(true)}>
				Add New Service
			</Button>
			<DialogContent className='md:w-[600px] max-h-[100vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Add New Service</DialogTitle>
					{state && <DialogDescription>{state}</DialogDescription>}
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
					</div>
					{/* Thumbnail image */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='thumbnail'>Thumbnail Image</Label>
						<Input id='thumbnail' name='thumbnail' type='file' />
					</div>

					<div className='flex w-full items-center justify-end'>
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
