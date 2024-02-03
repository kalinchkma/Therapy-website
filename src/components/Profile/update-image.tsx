/** @format */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import Image from 'next/image';
import { updateAvatar } from '@/actions/users-actions';
import { useFormState } from 'react-dom';

export default function UpdateImage({
	className,
	authId,
	path,
}: {
	className?: string;
	authId: string;
	path: string;
}) {
	const [file, setFile] = useState<File>();
	const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>();
	const imageMimeType = /image\/(png|jpg|jpeg)/i;
	const handleChooseFile = () => {
		const input = document.getElementById('file-upload');
		input?.click();
	};

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

	const update_avatar = updateAvatar.bind(null, Number(authId), path);

	const [open, setOpen] = useState<boolean>(false);

	const [state, dispatch] = useFormState(update_avatar, undefined);

	useEffect(() => {
		if (state?.error === false) {
			setOpen(false);
			setFileDataURL('');
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button
				variant='secondary'
				className='font-bold'
				onClick={() => setOpen(true)}>
				Change Image
			</Button>

			<DialogContent className='sm:max-w-[425px]'>
				<form className='w-full' action={dispatch}>
					<div className='flex items-center justify-center'>
						{state?.error && (
							<span className='text-red-500'>{state.message}</span>
						)}
					</div>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<div className='flex flex-col col-span-4 items-center justify-center'>
								{fileDataURL ? (
									<p className='img-preview-wrapper'>
										{
											<Image
												src={fileDataURL as string}
												width={'300'}
												height={'300'}
												alt='preview'
											/>
										}
									</p>
								) : null}
								<Button
									variant={'secondary'}
									type='button'
									onClick={handleChooseFile}>
									Chose Image
								</Button>
								<p className='text-sm'> Image must be less than 10 MB</p>
							</div>
							<Input
								id='file-upload'
								type='file'
								name='avatar'
								className='col-span-3 hidden'
								onChange={changeHandler}
								accept='.png, .jpg, .jpeg, .svg'
							/>
						</div>
					</div>
					<div className='flex w-full items-center justify-center'>
						<Button type='submit'>Change</Button>
						<Button
							variant='ghost'
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
