/** @format */
'use client';
import { deleteGellaryImage } from '@/actions/image-gellary-actions';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog';

import Image from 'next/image';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function ImageCard({
	imageInfo,
	host,
}: {
	imageInfo: {
		id: number;
		createdAt: Date | null;
		updatedAt: Date | null;
		image_path: string;
		image_url: string;
	};
	host: string;
}) {
	const { toast } = useToast();
	const delete_image = deleteGellaryImage.bind(null, imageInfo.id);
	return (
		<div className='flex items-center justify-center w-full relative'>
			<Image
				src={imageInfo.image_url}
				width={200}
				height={200}
				alt='image'
				className='w-[200px] h-[200px]'
			/>
			<div className='p-4 gap-3 flex items-end justify-center absolute top-0 left-0 w-full h-full'>
				<Dialog>
					<DialogTrigger className='py-2 px-4 bg-green-500 rounded-md text-white'>
						View
					</DialogTrigger>
					<DialogContent
						className='flex flex-col items-center justify-center max-w-full
                     md:max-w-[600px]'>
						<Image
							src={imageInfo.image_url}
							width={600}
							height={600}
							alt='image'
						/>
						<div className='flex gap-2'>
							<DialogClose className='py-2 px-4 bg-zinc-200 rounded-md'>
								Close
							</DialogClose>
							<form action={delete_image}>
								<Button type='submit' variant={'destructive'}>
									Delete
								</Button>
							</form>
						</div>
					</DialogContent>
				</Dialog>
				<Button
					variant={'secondary'}
					onClick={async () => {
						await navigator.clipboard.writeText(`${imageInfo.image_url}`);
						toast({
							title: 'Copy',
							description: 'Image link copied',
							className: 'bg-green-600 text-white',
						});
					}}>
					Copy Link
				</Button>
			</div>
		</div>
	);
}
