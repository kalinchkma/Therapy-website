/** @format */
'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoneyType, PackageType } from '@/lib/definitions';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { FormState, updatePackage } from '@/actions/packages-actions';
import { Package } from './columns';

export default function EditPackage({
	curr_package,
}: {
	curr_package: Package;
}) {
	// dialog open state
	const [open, setOpen] = useState<boolean>(false);
	// creation state
	const [creationState, setCreationState] = useState<boolean>(false);
	const initalState: FormState = { status: 100 };

	const update_package = updatePackage.bind(null, curr_package.id);

	const [state, dispatch] = useFormState(update_package, initalState);

	useEffect(() => {
		if (state.status === 200) {
			(document.getElementById('package-form') as HTMLFormElement).reset();
			setCreationState(true);
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)}>Edit</Button>
			<DialogContent className='h-[100vh] overflow-y-auto'>
				<>
					<DialogHeader className='flex flex-col items-center justify-center'>
						<DialogTitle>Create new package</DialogTitle>
						{state.status === 200 && state.message && (
							<DialogTitle className='text-green-400'>
								{state.message}
							</DialogTitle>
						)}
						{state.status === 500 && state.message && (
							<DialogDescription className='text-red-400'>
								{state.message}
							</DialogDescription>
						)}
					</DialogHeader>
					<form
						id='package-form'
						className='flex flex-col w-full md:w-[600px] mx-auto'
						action={dispatch}>
						{/* title */}
						<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
							<Label htmlFor='package-title'>Title</Label>
							<Input
								id='package-title'
								name='package-title'
								defaultValue={curr_package.title}
								placeholder='Enter package title....'
							/>
							{state.errors?.package_title && (
								<p className='text-red-400'>{state.errors.package_title[0]}</p>
							)}
						</div>
						{/* Descrription */}
						<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
							<Label htmlFor='package-description'>Description</Label>
							<Textarea
								id='package-description'
								name='package-description'
								defaultValue={curr_package.description}
								placeholder='Enter package description....'
							/>
							{state.errors?.package_description && (
								<p className='text-red-400'>
									{state.errors.package_description[0]}
								</p>
							)}
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
										type='number'
										defaultValue={curr_package.price}
										placeholder='Enter package Price....'
									/>
									{state.errors?.package_price && (
										<p className='text-red-400'>
											{state.errors.package_price[0]}
										</p>
									)}
								</div>
								{/* money type */}
								<div className='flex flex-col gap-2'>
									<Label htmlFor='money-type'>Money Type</Label>
									<select
										id='money-type'
										name='money-type'
										className='py-2 px-4 rounded-sm bg-transparent border'>
										<option disabled>Select Money Type</option>
										{curr_package.moneyType === MoneyType.TAKA ? (
											<>
												<option value={MoneyType.TAKA} selected>
													৳ {MoneyType.TAKA}
												</option>
												<option value={MoneyType.DOLLER}>
													$ {MoneyType.DOLLER}
												</option>
											</>
										) : (
											<>
												<option value={MoneyType.DOLLER} selected>
													$ {MoneyType.DOLLER}
												</option>
												<option value={MoneyType.TAKA}>
													৳ {MoneyType.TAKA}
												</option>
											</>
										)}
									</select>
									{state.errors?.money_type && (
										<p className='text-red-400'>{state.errors.money_type}</p>
									)}
								</div>
								{/* offers */}
								<div className='flex flex-col gap-2'>
									<Label htmlFor='package-offer'>Offer</Label>
									<Input
										id='package-offer'
										name='package-offer'
										type='number'
										defaultValue={curr_package.offers}
										placeholder='Define Package offer....'
									/>
									{state.errors?.package_offer && (
										<p className='text-red-400'>{state.errors.package_offer}</p>
									)}
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
									<option
										value={PackageType.DAILY}
										selected={
											curr_package.package_type == PackageType.DAILY
												? true
												: false
										}>
										{PackageType.DAILY}
									</option>
									<option
										value={PackageType.WEEKLY}
										selected={
											curr_package.package_type == PackageType.WEEKLY
												? true
												: false
										}>
										{PackageType.WEEKLY}
									</option>
									<option
										value={PackageType.MONTHLY}
										selected={
											curr_package.package_type == PackageType.MONTHLY
												? true
												: false
										}>
										{PackageType.MONTHLY}
									</option>
									<option
										value={PackageType.YEARLY}
										selected={
											curr_package.package_type == PackageType.YEARLY
												? true
												: false
										}>
										{PackageType.YEARLY}
									</option>
								</select>
							</div>
							{state.errors?.package_type && (
								<p className='text-red-400'>{state.errors.package_type}</p>
							)}
						</div>

						{/* Package details */}
						<div className='w-full flex flex-col items-start justify-center gap-2 pb-3'>
							<Label htmlFor='package-details'>Package Details</Label>
							<Textarea
								id='package-details'
								name='package-details'
								placeholder='Enter package details....'
								defaultValue={curr_package.packageDetails}
								className='md:h-[250px] h-[200px]'
							/>
							{state.errors?.package_details && (
								<p className='text-red-400'>{state.errors.package_details}</p>
							)}
						</div>
						{/* action */}
						<div className='flex items-center justify-center mt-3'>
							<Button type='submit'>Update</Button>
							<Button
								variant='secondary'
								type='button'
								onClick={() => setOpen(false)}>
								Cancel
							</Button>
						</div>
					</form>
				</>
			</DialogContent>
		</Dialog>
	);
}
