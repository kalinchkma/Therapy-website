/** @format */
'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	BannerFormState,
	deleteBanner,
	updateBanner,
} from '@/actions/home-page-actions';
import { useFormState } from 'react-dom';

type Banner = {
	section: string;
	id: number;
	content: unknown;
	page: string;
};

type Content = {
	title: string;
	subTitle: string;
	navigate_link: {
		title: string;
		URL: string;
	};
	image: string;
};

export default function BannerCard({ banner }: { banner: Banner }) {
	const content = JSON.parse(String(banner.content)) as Content;

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

	// update server action
	const initialState: BannerFormState = { status: 100 };
	const update_banner = updateBanner.bind(null, banner.id);

	const [state, dispath] = useFormState(update_banner, initialState);

	// delete server action
	const delete_banner = deleteBanner.bind(null, banner.id);

	return (
		<div className='border p-4'>
			<form className='w-full flex flex-col gap-2' action={dispath}>
				{state.status === 500 && state.message && (
					<p className='text-red-400'>{state.message}</p>
				)}
				{state.status === 200 && state.message && (
					<p className='text-green-400'>{state.message}</p>
				)}
				{/* Title */}
				<div className='flex flex-col'>
					<Label>Title</Label>
					<Input
						name='title'
						type='text'
						defaultValue={content.title}
						placeholder='Enter banner title'
					/>
					{state.errors && state.errors.title && (
						<p className='text-red-400'>{state.errors.title[0]}</p>
					)}
				</div>
				{/* Subtitle */}
				<div className='flex flex-col'>
					<Label>Sub Title</Label>
					<Input
						name='subtitle'
						type='text'
						defaultValue={content.subTitle}
						placeholder='Enter banner sub title'
					/>
					{state.errors && state.errors.subTitle && (
						<p className='text-red-400'>{state.errors.subTitle[0]}</p>
					)}
				</div>
				{/* Link */}
				<div className='flex flex-col'>
					<Label>Link</Label>
					<Textarea
						name='navigate-link'
						defaultValue={JSON.stringify(content.navigate_link, undefined, 2)}
						placeholder='Enter Banner link'
					/>
					{state.errors && state.errors.link && (
						<p className='text-red-400'>{state.errors.link[0]}</p>
					)}
				</div>
				{/* Image */}
				<div className='flex flex-col'>
					<Label>Background Image</Label>
					<Input type='file' name='image' onChange={changeHandler} />
					{state.errors && state.errors.image && (
						<p className='text-red-400'>{state.errors.image[0]}</p>
					)}
				</div>
				{content.image && !fileDataURL && (
					<Image
						src={content.image}
						width={300}
						height={300}
						alt='banner image'
					/>
				)}
				{fileDataURL && (
					<Image
						src={fileDataURL as string}
						width={300}
						height={300}
						alt='banner image'
					/>
				)}
				<div className='flex items-center justify-center'>
					<Button type='submit'>Update</Button>
				</div>
			</form>
			<form
				className='flex items-center justify-center mt-3'
				action={delete_banner}>
				<Button type='submit' variant='destructive'>
					Delete
				</Button>
			</form>
		</div>
	);
}
