/** @format */
'use client';

import { updateServiceImage } from '@/actions/services-actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

export default function UpdateServiceImage({ id }: { id: number }) {
	const [open, setOpen] = useState<boolean>(false);

	const update_service_image = updateServiceImage.bind(null, id);

	return (
		<Dialog open={open}>
			<Button size='sm' variant='secondary' onClick={() => setOpen(true)}>
				Change
			</Button>
			<DialogContent className='max-w-[300px]'>
				<form
					className='w-full flex flex-col gap-4'
					action={update_service_image}>
					{/* File input */}
					<p className='text-sm'>Image must be less than 50 MB</p>
					<Input type='file' name='image' className='cursor-pointer' />
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
