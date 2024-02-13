/** @format */
'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PackageType } from '@/lib/definitions';
import { Textarea } from '@/components/ui/textarea';

export default function CreatePackage() {
	// dialog open state
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)}>
				Create Package <Plus />
			</Button>
			<DialogContent>
				<DialogHeader className='flex flex-col items-center justify-center'>
					<DialogTitle>Create new package</DialogTitle>
					<DialogDescription className='text-red-400'>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
					<DialogDescription className='text-green-400'>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<form className='flex flex-col w-full md:w-[600px] mx-auto'>
					{/* title */}
					<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
						<Label htmlFor='package-title'>Title</Label>
						<Input id='package-title' placeholder='Enter package title....' />
						<p className='text-red-400'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							aspernatur minima tempora odio quasi exercitationem nam?
						</p>
					</div>
					{/* Descrription */}
					<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
						<Label htmlFor='package-description'>Description</Label>
						<Textarea
							id='package-description'
							placeholder='Enter package description....'
						/>
						<p className='text-red-400'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							aspernatur minima tempora odio quasi exercitationem nam?
						</p>
					</div>

					{/* Descrription */}
					<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
						<Label htmlFor='package-description'>Description</Label>
						<Textarea
							id='package-description'
							placeholder='Enter package description....'
						/>
						<p className='text-red-400'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							aspernatur minima tempora odio quasi exercitationem nam?
						</p>
					</div>
					{/* Package Type */}
					<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
						<div className='flex items-center justify-center gap-3'>
							<Label htmlFor='package-type'>Package Type</Label>
							<select
								id='package-type'
								name='package-type'
								className='py-2 px-4 rounded-sm bg-transparent border'>
								<option selected disabled>
									Select Package Type
								</option>
								<option value={PackageType.DAILY}>{PackageType.DAILY}</option>
								<option value={PackageType.WEEKLY}>{PackageType.WEEKLY}</option>
								<option value={PackageType.MONTHLY}>
									{PackageType.MONTHLY}
								</option>
								<option value={PackageType.YEARLY}>{PackageType.YEARLY}</option>
							</select>
						</div>
						<p className='text-red-400'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							aspernatur minima tempora odio quasi exercitationem nam?
						</p>
					</div>
					{/* action */}
					<div className='flex items-center justify-center mt-3'>
						<Button type='submit'>Create</Button>
						<Button
							variant='secondary'
							type='button'
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
