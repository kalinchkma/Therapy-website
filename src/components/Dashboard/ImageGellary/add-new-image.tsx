/** @format */
'use client';
import { uploadGellaryImage } from '@/actions/image-gellary-actions';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

export default function AddNewImage() {
	const [open, setOpen] = useState<boolean>(false);
	const [formMessage, setFormMessage] = useState<string | undefined>();

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

	// add new image state
	const [state, dispatch] = useFormState(uploadGellaryImage, {
		status: 100,
		message: '',
	});

	useEffect(() => {
		if (state.message) {
			setFormMessage(state.message);
		}
		if (state.status === 200) {
			(document.getElementById('gellary-form') as HTMLFormElement).reset();
			setFileDataURL('');
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)}>
				Add new image <Plus />
			</Button>
			<DialogContent className='w-full md:max-w-[600px]'>
				<DialogHeader>
					<DialogTitle>
						Add new image (image must be less than 80MB)
					</DialogTitle>
				</DialogHeader>
				<form
					className='flex flex-col gap-5'
					action={dispatch}
					id='gellary-form'>
					{state.status === 200 && state.message && formMessage && (
						<h4 className='text-green-500'>{formMessage}</h4>
					)}
					{(state.status === 400 || state.status === 500) &&
						state.message &&
						formMessage && <h4 className='text-red-500'>{formMessage}</h4>}
					<Input
						type='file'
						placeholder='Add image'
						name='image'
						onChange={changeHandler}
						required
					/>
					{fileDataURL && (
						<Image
							src={fileDataURL as string}
							width={300}
							height={300}
							alt='new image'
						/>
					)}
					<div className='flex items-center justify-center'>
						<Button type='submit'>Upload</Button>
						<Button
							type='button'
							onClick={() => {
								setOpen(false);
								(
									document.getElementById('gellary-form') as HTMLFormElement
								).reset();
								setFileDataURL('');
								setFormMessage(undefined);
							}}
							variant='secondary'>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
