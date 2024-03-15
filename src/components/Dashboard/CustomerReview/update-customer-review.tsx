/** @format */

'use client';

import {
	FormState,
	addNewCustomerReview,
	editCustomerReview,
} from '@/actions/customer-review-actions';
import ReviewCard from '@/components/common/review-card';
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
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export type Review = {
	id: number;
	createdAt: Date | null;
	updatedAt: Date | null;
	video_url: string;
	thumbnail_image: string;
};

export default function UpdateCustomerReview({
	review,
	host,
}: {
	review: Review;
	host: string;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const [formMessage, setFormMessage] = useState<string>();
	const [file, setFile] = useState<File>();
	const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>(
		review.thumbnail_image,
	);
	const [videoURL, setVideoURL] = useState<string>(review.video_url);
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

	const initialState: FormState = { status: 100 };

	const update_review = editCustomerReview.bind(null, review.id);
	/// file upload state
	const [state, dispatch] = useFormState(update_review, initialState);

	useEffect(() => {
		if (state.message) {
			setFormMessage(state.message);
		}
		if (state.status === 200) {
			(document.getElementById('rv-form') as HTMLFormElement).reset();
			setFileDataURL('');
			setVideoURL('');
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button
				variant='secondary'
				className='bg-green-500 hover:bg-green-600 text-white'
				type='button'
				onClick={() => setOpen(true)}>
				Edit
			</Button>

			<DialogContent className='max-w-full h-[100vh] flex flex-col overflow-y-auto md:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle className='text-center'>
						Add new customer revivew
					</DialogTitle>
					{state.status === 500 && state.message && (
						<DialogDescription className='text-red-400'>
							{formMessage}
						</DialogDescription>
					)}
					{state.status === 200 && state.message && (
						<DialogDescription className='text-green-400'>
							{formMessage}
						</DialogDescription>
					)}
				</DialogHeader>
				<form
					className='w-full h-full flex flex-col items-start justify-start gap-4'
					action={dispatch}
					id='rv-form'>
					{/* video url */}
					<div className='w-full flex flex-col'>
						<Label htmlFor='video-url' className='text-zinc-600 text-lg mb-2'>
							Video URL
						</Label>
						<Input
							id='video-url'
							name='video-url'
							type='text'
							placeholder='Enter video url'
							defaultValue={review.video_url}
							onChange={(e) => setVideoURL(e.target.value)}
							required
						/>
						{state.errors?.video_url && (
							<p className='text-red-400'>{state.errors.video_url}</p>
						)}
					</div>
					{/* video thumbnail */}
					<div className='w-full flex flex-col'>
						<Label
							htmlFor='video-thumbnail'
							className='text-zinc-600 text-lg mb-2'>
							Video thumbnail IMAGE (max 10MB)
						</Label>
						<Input
							id='video-thumbnail'
							name='video-thumbnail'
							type='file'
							onChange={changeHandler}
							placeholder='Enter video url'
							required
						/>
						{state.errors?.thumbnail_image && (
							<p className='text-red-400'>{state.errors.thumbnail_image}</p>
						)}
					</div>
					<div className='flex items-center justify-center gap-2'>
						<Button type='submit'>Update</Button>
						<Button
							type='button'
							variant='secondary'
							onClick={() => {
								setOpen(false);
								setFormMessage('');
							}}>
							Cancel
						</Button>
					</div>
				</form>
				{fileDataURL && videoURL && (
					<div className='w-full flex items-center justify-center'>
						<ReviewCard
							videoUrl={videoURL}
							thumbnil={`${host}${fileDataURL}`}
						/>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
