/** @format */
'use client';

import {
	ProductFormState,
	addNewProduct,
	updateProduct,
} from '@/actions/product-actions';
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
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

type Product = {
	id: number;
	title: string;
	image: string;
	description: string | null;
	price: number;
};

// create new product
export default function EditProduct({ product }: { product: Product }) {
	const [open, setOpen] = useState<boolean>(false);

	const [file, setFile] = useState<File>();
	const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>();
	const imageMimeType = /image\/(png|jpg|jpeg|svg)/i;

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			let file = e.target.files[0];
			if (!file.type.match(imageMimeType)) {
				alert('Image mime type is not valid');
				return;
			}
			setFile(file);
		}
	};

	useEffect(() => {
		let fileReader: FileReader;
		let isCancel = false;
		if (file) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const result = e.target?.result;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(file);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file]);

	const [formMessage, setFormMessage] = useState<string | undefined>();
	const initialState: ProductFormState = { status: 100 };
	const edit_product = updateProduct.bind(null, product.id);
	const [state, dispatch] = useFormState(edit_product, initialState);

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
			<Button
				type='button'
				className='flex items-center justify-center gap-1'
				onClick={() => setOpen(true)}>
				Edit
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
							defaultValue={product.title}
							required
						/>
						{state.errors?.product_title && (
							<p className='text-red-400'>{state.errors.product_title[0]}</p>
						)}
					</div>
					<div className='flex w-full flex-col gap-2'>
						<Label>Product Image (image size less than 50MB)</Label>
						<Input type='file' name='product-image' onChange={changeHandler} />
						{!fileDataURL && product.image && (
							<Image
								src={product.image}
								width={300}
								height={300}
								alt='Product image'
							/>
						)}
						{fileDataURL && (
							<Image
								src={fileDataURL as string}
								width={300}
								height={300}
								alt='Product image'
							/>
						)}
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
							defaultValue={product.price}
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
							defaultValue={product.description!}
						/>
						{state.errors?.product_description && (
							<p className='text-red-400'>
								{state.errors.product_description[0]}
							</p>
						)}
					</div>
					<div className='flex w-full items-center justify-center gap-2'>
						<Button type='submit'>Update</Button>
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
