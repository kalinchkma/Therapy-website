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
import { MoneyType, PackageType } from '@/lib/definitions';
import { Textarea } from '@/components/ui/textarea';

export default function CreatePackage() {
	// dialog open state
	const [open, setOpen] = useState<boolean>(false);
	// creation state
	const [creationState, setCreationState] = useState<boolean>(false);

	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)} className='ml-2'>
				Create Package <Plus />
			</Button>
			<DialogContent className='h-[100vh] overflow-y-auto'>
				{!creationState ? (
					<>
						<DialogHeader className='flex flex-col items-center justify-center'>
							<DialogTitle>Create new package</DialogTitle>
							<DialogDescription className='text-red-400'></DialogDescription>
							<DialogDescription className='text-green-400'></DialogDescription>
						</DialogHeader>
						<form className='flex flex-col w-full md:w-[600px] mx-auto'>
							{/* title */}
							<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
								<Label htmlFor='package-title'>Title</Label>
								<Input
									id='package-title'
									name='package-title'
									placeholder='Enter package title....'
								/>
								<p className='text-red-400'></p>
							</div>
							{/* Descrription */}
							<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
								<Label htmlFor='package-description'>Description</Label>
								<Textarea
									id='package-description'
									name='package-description'
									placeholder='Enter package description....'
								/>
								<p className='text-red-400'></p>
							</div>

							{/* price */}
							<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-1'>
									{/* package price */}
									<div className='flex flex-col gap-2'>
										<Label htmlFor='package-price'>Price</Label>
										<Input
											id='package-price'
											name='package-price'
											placeholder='Enter package Price....'
										/>
										<p className='text-red-400'></p>
									</div>
									{/* money type */}
									<div className='flex flex-col gap-2'>
										<Label htmlFor='package-type'>Money Type</Label>
										<select
											id='package-type'
											name='package-type'
											className='py-2 px-4 rounded-sm bg-transparent border'>
											<option disabled>Select Money Type</option>
											<option value={MoneyType.TAKA} selected>
												৳ {MoneyType.TAKA}
											</option>
											<option value={MoneyType.DOLLER}>
												$ {MoneyType.DOLLER}
											</option>
										</select>
										<p className='text-red-400'></p>
									</div>
									{/* offers */}
									<div className='flex flex-col gap-2'>
										<Label htmlFor='package-offer'>Offer(optional)</Label>
										<Input
											id='package-offer'
											name='package-offer'
											placeholder='Define Package offer....'
										/>
										<p className='text-red-400'></p>
									</div>
								</div>
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
										<option value={PackageType.DAILY}>
											{PackageType.DAILY}
										</option>
										<option value={PackageType.WEEKLY}>
											{PackageType.WEEKLY}
										</option>
										<option value={PackageType.MONTHLY}>
											{PackageType.MONTHLY}
										</option>
										<option value={PackageType.YEARLY}>
											{PackageType.YEARLY}
										</option>
									</select>
								</div>
								<p className='text-red-400'></p>
							</div>

							{/* Package details */}
							<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
								<Label htmlFor='package-details'>Package Details</Label>
								<Textarea
									id='package-details'
									name='package-details'
									placeholder='Enter package details....'
								/>
								<p className='text-red-400'></p>
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
					</>
				) : (
					<div className='flex flex-col items-center justify-center'>
						<DialogHeader className='flex flex-col items-center justify-center'>
							<DialogTitle className='text-green-400'>
								Package created successfully!
							</DialogTitle>
						</DialogHeader>
						<Button type='button' onClick={() => setCreationState(false)}>
							Create New one
						</Button>
						<Button
							variant='secondary'
							type='button'
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
