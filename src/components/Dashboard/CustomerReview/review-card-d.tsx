/** @format */
'use client';
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { cn } from '@/lib/utils';
import { IoPlayForwardOutline } from 'react-icons/io5';
import { IoPlayForwardSharp } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import ReactPlayer from 'react-player/lazy';
import Image from 'next/image';
import { Button } from '../../ui/button';

interface ReviewCardProps {
	children?: React.ReactNode;
	className?: string;
	videoUrl: string;
	thumbnil?: string | ArrayBuffer;
	admin?: React.ReactNode;
}

export default function ReviewCardD({
	children,
	thumbnil,
	videoUrl,
	className,
	admin,
}: ReviewCardProps) {
	return (
		<Card className='border-0'>
			<CardContent
				className={cn(
					'flex flex-col aspect-square items-center justify-center p-2 gap-2 bg-zinc-100 ',
					className,
				)}>
				<Dialog>
					<DialogTrigger asChild>
						<div className='w-full h-full relative cursor-pointer'>
							<Image
								src={thumbnil as string}
								alt='thumbnil'
								width={400}
								height={400}
								className='object-cover h-[100%] w-[100%]'
							/>
							<div className='absolute transition-all w-full h-full bg-zinc-800 bg-opacity-0 hover:bg-opacity-50 top-0 left-0 flex flex-col gap-2 items-center justify-center'>
								<button className='py-4 px-5 border border-zinc-500 hover:text-white hover:border-zinc-800 hover:bg-zinc-800 hover:bg-opacity-50 transition-colors'>
									<FaPlay className='h-8 w-8 text-purple-600' />
								</button>
							</div>
						</div>
					</DialogTrigger>
					<DialogContent className='w-[100vw] h-[100vh] bg-transparent border-0'>
						<div className='w-full h-full flex items-center justify-center'>
							<ReactPlayer
								url={videoUrl}
								width={'100%'}
								height={'100%'}
								controls={true}
							/>
						</div>
					</DialogContent>
				</Dialog>
				{admin}
			</CardContent>
		</Card>
	);
}
