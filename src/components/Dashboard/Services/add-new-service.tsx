/** @format */

'use client';

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
import React, { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AddNewService() {
	const [openModel, setOpenModel] = useState<boolean>(false);
	const [serviceContent, setServiceContent] = useState<string | undefined>(
		undefined,
	);

	const handlerContentChanange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setServiceContent(e.target.value);
	};

	useEffect(() => {
		console.log(serviceContent);
	}, [serviceContent]);

	return (
		<Dialog open={openModel}>
			<Button className='ml-4' onClick={(e) => setOpenModel(true)}>
				Add New Service
			</Button>
			<DialogContent className='md:w-[600px] max-h-[100vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Add New Service</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<form className='w-full flex flex-col gap-4 '>
					{/* Service name */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='name'>Name</Label>
						<Input
							id='name'
							name='name'
							type='text'
							placeholder='Enter a name of service....'
						/>
					</div>
					{/* Service description */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							placeholder='Enter a name of service description....'
						/>
					</div>

					{/* Service price */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='price'>Service price (optional)</Label>
						<Input
							id='price'
							name='price'
							type='number'
							placeholder='Enter a price of a server....'
						/>
					</div>
					{/* Thumbnail image */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='thumbnail'>Thumbnail Image</Label>
						<Input id='thumbnail' name='thumbnail' type='file' />
					</div>

					{/* service content */}
					<div className='flex flex-col gap-3 w-full'>
						<Label htmlFor='content'>Add Content (optional)</Label>
						<div className='block w-full markdown'>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{serviceContent}
							</ReactMarkdown>
						</div>
						<div className='flex items-end justify-center gap-3'>
							<Textarea
								placeholder='Write a Service content...'
								onChange={handlerContentChanange}
								className='resize-y'
							/>
						</div>
					</div>

					<div className='flex w-full items-center justify-end'>
						<Button type='submit'>Create</Button>
						<Button
							type='button'
							variant='ghost'
							onClick={(e) => setOpenModel(false)}>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
