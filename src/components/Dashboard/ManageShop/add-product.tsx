/** @format */
'use client';
import { ProductFormState, addNewProduct } from '@/actions/product-actions';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function AddProduct() {
	const [open, setOpen] = useState<boolean>(false);

	const [formMessage, setFormMessage] = useState<string | undefined>();
	const initialState: ProductFormState = { status: 100 };
	const [state, dispatch] = useFormState(addNewProduct, initialState);

	useEffect(() => {
		if (state.message) {
			setFormMessage(state.message);
		}
		if (state.status === 200) {
			(document.getElementById('product-form') as HTMLFormElement).reset();
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button type='button' onClick={() => setOpen(true)}>
				Add new product <Plus />
			</Button>
			<DialogContent className='max-w-full md:max-w-[600px] h-[100vh] overflow-y-auto flex flex-col items-start justify-start'>
				<DialogHeader>
					<DialogTitle>Add new product</DialogTitle>
					{state.status === 500 && state.message && formMessage && (
						<DialogDescription className='text-red-400'>
							{formMessage}
						</DialogDescription>
					)}
					{state.status === 200 && state.message && formMessage && (
						<DialogDescription className='text-green-400'>
							{formMessage}
						</DialogDescription>
					)}
				</DialogHeader>
				<form
					id='product-form'
					className=' w-full flex flex-col items-start justify-start gap-2'
					action={dispatch}>
					<div className='flex w-full flex-col gap-2'>
						<Label>Product Title</Label>
						<Input
							type='text'
							placeholder='Enter product title'
							name='product-title'
							required
						/>
						{state.errors?.product_title && (
							<p className='text-red-400'>{state.errors.product_title[0]}</p>
						)}
					</div>
					<div className='flex w-full flex-col gap-2'>
						<Label>Product Image (image size less than 50MB)</Label>
						<Input type='file' name='product-image' required />
						{state.errors?.product_image && (
							<p className='text-red-400'>{state.errors.product_image[0]}</p>
						)}
					</div>
					<div className='flex w-full flex-col gap-2'>
						<Label>Price</Label>
						<Input
							type='number'
							placeholder='Enter product price'
							name='product-price'
							required
						/>
						{state.errors?.product_price && (
							<p className='text-red-400'>{state.errors.product_price[0]}</p>
						)}
					</div>
					<div className='flex w-full flex-col gap-2'>
						<Label>Product Description (optional)</Label>
						<Textarea
							name='product-description'
							placeholder='Enter product description'
						/>
						{state.errors?.product_description && (
							<p className='text-red-400'>
								{state.errors.product_description[0]}
							</p>
						)}
					</div>
					<div className='flex w-full items-center justify-center'>
						<Button type='submit'>Create</Button>
						<Button
							type='button'
							variant='secondary'
							onClick={() => {
								setOpen(false);
								setFormMessage(undefined);
							}}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
