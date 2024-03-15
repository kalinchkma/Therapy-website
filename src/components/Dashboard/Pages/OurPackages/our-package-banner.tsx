/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import {
	Banner,
	BannerUpdateState,
	pageBannerUpdate,
} from '@/actions/page-banner-actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';

export default function OurPackageBanner({
	banner,
	host,
}: {
	banner: {
		id: number;
		section: string;
		content: unknown;
		page: string;
	};
	host: string;
}) {
	// parse banner content
	let b = JSON.parse(String(banner.content)) as Banner;

	const [file, setFile] = useState<File>();
	const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>();
	const imageMimeType = /image\/(png|jpg|jpeg)/i;

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

	// update state
	const initialState: BannerUpdateState = { status: 100 };
	const update_function = pageBannerUpdate.bind(null, banner.id, 'our-package');
	const [state, dispatch] = useFormState(update_function, initialState);

	return (
		banner && (
			<div className='w-full py-8 px-2 border'>
				<h4 className='font-bold mb-4'>Page Banner</h4>
				{state.status === 500 && state.message && (
					<p className='text-red-400'>{state.message}</p>
				)}
				{state.status === 200 && state.message && (
					<p className='text-green-400'>{state.message}</p>
				)}
				<form className='flex flex-col gap-5' action={dispatch}>
					<div className='flex flex-col gap-2'>
						<Label>Title</Label>
						<Input
							type='text'
							name='title'
							defaultValue={b.title}
							placeholder='Enter page banner title'
						/>
						{state.errors?.title && (
							<p className='text-red-400'>{state.errors.title[0]}</p>
						)}
					</div>

					<div className='flex flex-col gap-2'>
						<Label>Sub Title</Label>
						<Input
							type='text'
							name='sub-title'
							defaultValue={b.subTitle}
							placeholder='Enter page banner sub-title'
						/>
						{state.errors?.subTitle && (
							<p className='text-red-400'>{state.errors.subTitle[0]}</p>
						)}
					</div>

					<div className='flex flex-col gap-2'>
						<Label>Background Image (Image must be less than 50MB)</Label>

						<Input type='file' name='bg-image' onChange={changeHandler} />
						{state.errors?.bgImage && (
							<p className='text-red-400'>{state.errors.bgImage[0]}</p>
						)}
						{!fileDataURL && b.bgImage && (
							<Image
								src={`${host}${b.bgImage}`}
								width={300}
								height={300}
								alt='banner-image'
							/>
						)}
						{fileDataURL && (
							<Image
								src={fileDataURL as string}
								width={300}
								height={300}
								alt='banner-image'
							/>
						)}
					</div>

					{/* action */}
					<div className='flex items-center'>
						<Button type='submit'>Update</Button>
					</div>
				</form>
			</div>
		)
	);
}
