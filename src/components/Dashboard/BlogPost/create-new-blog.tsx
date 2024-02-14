/** @format */
'use client';
import { createNewBlogPost, FormState } from '@/actions/blog-actions';
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
import Markdown from 'react-markdown';

export default function CreateNewBlog() {
	const [open, setOpen] = useState<boolean>(false);

	const [title, setTitle] = useState<string | undefined>();
	const [author, setAuthor] = useState<string | undefined>();
	const [abstract, setAbstract] = useState<string | undefined>();
	const [keywords, setKeywords] = useState<string | undefined>();
	const [content, setContent] = useState<string | undefined>();
	// image state
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

	// form submit stats
	const initialState: FormState = { status: 100 };
	const [successState, setSuccessState] = useState<boolean>(false);
	const [state, dispatch] = useFormState(createNewBlogPost, initialState);

	useEffect(() => {
		if (state.status === 200) {
			setSuccessState(true);
			setTitle('');
			setAuthor('');
			setAbstract('');
			setContent('');
			setFileDataURL('');
			setKeywords('');
		}
	}, [state]);

	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)}>
				Create new blog <Plus />
			</Button>
			<DialogContent className='h-[100vh] w-[100vw] overflow-y-auto flex flex-col'>
				<DialogHeader className='flex items-center justify-center'>
					<DialogTitle>Create new post</DialogTitle>
					{state.status === 500 && (
						<DialogDescription className='text-red-400'>
							{state.message}
						</DialogDescription>
					)}
				</DialogHeader>
				{successState ? (
					<div className='flex flex-col items-center justify-center w-full h-full'>
						<p className='text-green-500 text-2xl mb-3'>{state.message}</p>
						<div className='flex'>
							<Button onClick={() => setSuccessState(false)}>
								Create New Blog Post
							</Button>
							<Button variant='secondary' onClick={() => setOpen(false)}>
								Cancel
							</Button>
						</div>
					</div>
				) : (
					<form
						className='w-full grid grid-cols-1 md:grid-cols-5 gap-5'
						action={dispatch}>
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
									name='blog-title'
									placeholder='Create blog title.....'
									onChange={(e) => {
										setTitle(e.target.value);
									}}
								/>
								{state.errors?.title && (
									<p className='text-red-400'>{state.errors.title[0]}</p>
								)}
							</div>
							{/* Thumbnail Image */}
							<div className='flex flex-col'>
								<Label className='mb-3' htmlFor='blog-thumbnail'>
									Choose Thumbnail Image (Image must be less than 60 MB)
								</Label>
								<Input
									type='file'
									id='blog-thumbnail'
									name='blog-thumbnail'
									className='cursor-pointer'
									onChange={changeHandler}
								/>
								{state.errors?.thumbnailImage && (
									<p className='text-red-400'>{state.errors.thumbnailImage}</p>
								)}
							</div>
							{/* Blog author */}
							<div className='flex flex-col'>
								<Label className='mb-3' htmlFor='blog-author'>
									Blog Author
								</Label>
								<Input
									type='text'
									id='blog-author'
									name='blog-author'
									placeholder='Enter name of author......'
									onChange={(e) => setAuthor(e.target.value)}
								/>
								{state.errors?.author && (
									<p className='text-red-400'>{state.errors.author[0]}</p>
								)}
							</div>
							{/* blog summary */}
							<div className='flex flex-col'>
								<Label className='mb-3' htmlFor='blog-abstract'>
									Abstrct
								</Label>
								<Textarea
									id='blog-abstract'
									name='blog-abstract'
									placeholder='Enter abstract of your blog....'
									className='h-[150px]'
									onChange={(e) => setAbstract(e.target.value)}
								/>
								{state.errors?.summary && (
									<p className='text-red-400'>{state.errors.summary[0]}</p>
								)}
							</div>

							{/*Keywords */}
							<div className='flex flex-col'>
								<Label className='mb-3' htmlFor='blog-keywords'>
									Add Keywords (add keywords with `,`)
								</Label>
								<Input
									type='text'
									id='blog-keywords'
									name='blog-keywords'
									placeholder='Enter Blog keywords....'
									onChange={(e) => setKeywords(e.target.value)}
								/>
								{state.errors?.keywords && (
									<p className='text-red-400'>{state.errors.keywords}</p>
								)}
							</div>

							{/* blog content */}
							<div className='flex flex-col'>
								<Label className='mb-3' htmlFor='blog-content'>
									Blog Content
								</Label>
								<Textarea
									id='blog-content'
									name='blog-content'
									placeholder='Enter abstract of your blog....'
									className='h-[400px]'
									onChange={(e) => setContent(e.target.value)}
								/>
								{state.errors?.content && (
									<p className='text-red-400'>{state.errors.content}</p>
								)}
							</div>
						</div>
						{/* preview section */}
						<div className='col-span-1 md:col-span-3 h-full overflow-y-auto'>
							<h1 className=' text-2xl'>{title}</h1>
							<div className='flex items-start justify-start my-6'>
								{fileDataURL ? (
									<Image
										src={fileDataURL as string}
										width={'600'}
										height={'600'}
										alt='preview'
									/>
								) : null}
							</div>

							<div className='flex flex-col items-start justify-start mb-8'>
								<h3 className='p-0'>{author}</h3>
								{keywords && (
									<h3 className='italic m-0'>Keywords: {keywords}</h3>
								)}
							</div>
							<div className='flex'>{abstract}</div>
							<Markdown className='content-preview'>{content}</Markdown>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
