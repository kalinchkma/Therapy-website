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
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

export default function CreateNewBlog() {
	const [open, setOpen] = useState<boolean>(false);

	const [title, setTitle] = useState<string | undefined>();
	const [author, setAuthor] = useState<string | undefined>();
	const [abstract, setAbstract] = useState<string | undefined>();
	const [keywords, setKeywords] = useState<string | undefined>();

	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)}>
				Create new blog <Plus />
			</Button>
			<DialogContent className='h-[100vh] w-[100vw] overflow-y-auto flex flex-col'>
				<DialogHeader className='flex items-center justify-center'>
					<DialogTitle>Create new post</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<form className='w-full grid grid-cols-1 md:grid-cols-5 gap-2'>
					{/* action button */}
					<div className='flex items-center justify-start col-span-1 md:col-span-5 border-b pb-2 mb-2'>
						<Button type='submit'>Create</Button>
						<Button
							type='button'
							variant='secondary'
							onClick={() => setOpen(false)}>
							Cancel
						</Button>
					</div>

					{/* input section */}
					<div className='col-span-2 flex flex-col gap-4 h-full p-1'>
						{/* Blog title */}
						<div className='flex flex-col'>
							<Label className='mb-3' htmlFor='blog-title'>
								Title
							</Label>
							<Input
								type='text'
								id='blog-title'
								placeholder='Create blog title.....'
							/>
							<p className='text-red-400'></p>
						</div>
						{/* Blog author */}
						<div className='flex flex-col'>
							<Label className='mb-3' htmlFor='blog-author'>
								Blog Author
							</Label>
							<Input
								type='text'
								id='blog-author'
								placeholder='Enter name of author......'
							/>
							<p className='text-red-400'></p>
						</div>
						{/* blog summary */}
						<div className='flex flex-col'>
							<Label className='mb-3' htmlFor='blog-abstract'>
								Quick Blog Abstrct
							</Label>
							<Textarea
								id='blog-abstract'
								placeholder='Enter abstract of your blog....'
								className='h-[150px]'
							/>
							<p className='text-red-400'></p>
						</div>
						{/* Thumbnail Image */}
						<div className='flex flex-col'>
							<Label className='mb-3' htmlFor='blog-thumbnail'>
								Choose Thumbnail Image
							</Label>
							<Input
								type='file'
								id='blog-thumbnail'
								className='cursor-pointer'
							/>
							<p className='text-red-400'></p>
						</div>

						{/*Keywords */}
						<div className='flex flex-col'>
							<Label className='mb-3' htmlFor='blog-keywords'>
								Add Keywords (add keywords with `,`)
							</Label>
							<Input
								type='text'
								id='blog-keywords'
								placeholder='Enter Blog keywords....'
							/>
							<p className='text-red-400'></p>
						</div>

						{/* blog content */}
						<div className='flex flex-col'>
							<Label className='mb-3' htmlFor='blog-content'>
								Blog Content
							</Label>
							<Textarea
								id='blog-content'
								placeholder='Enter abstract of your blog....'
								className='h-[400px]'
							/>
							<p className='text-red-400'></p>
						</div>
					</div>
					{/* preview section */}
					<div className='col-span-1 md:col-span-3 h-full overflow-y-auto'>
						<h1>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Pariatur, itaque?
						</h1>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
