/** @format */
'use client';
import { updateBlogPost, FormState } from '@/actions/blog-actions';
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

export default function UpdateBlog({
	blog,
	host,
}: {
	blog: {
		author: string;
		keywords: string | null;
		title: string;
		summary: string;
		id: number;
		content: string | null;
		createdAt: Date | null;
		updatedAt: Date | null;
		thumbnailImage: string | null;
		comment: number | null;
	};
	host: string;
}) {
	const [open, setOpen] = useState<boolean>(false);

	const [title, setTitle] = useState<string | undefined>(blog.title);
	const [author, setAuthor] = useState<string | undefined>(blog.author);
	const [abstract, setAbstract] = useState<string | undefined>(blog.summary);
	const [keywords, setKeywords] = useState<string | undefined>(blog.keywords!);
	const [content, setContent] = useState<string | undefined>(blog.content!);
	// image state
	const [file, setFile] = useState<File>();
	const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer>();
	const imageMimeType = /image\/(png|jpg|jpeg)/i;

	const closeModel = () => {
		setOpen(false);
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

	// form submit stats
	const initialState: FormState = { status: 100 };

	const update_blog = updateBlogPost.bind(null, blog.id);
	const [state, dispatch] = useFormState(update_blog, initialState);

	useEffect(() => {}, [state]);

	return (
		<Dialog open={open}>
			<Button onClick={() => setOpen(true)}>View</Button>
			<DialogContent className='h-[100vh] w-[100vw] overflow-y-auto flex flex-col'>
				<DialogHeader className='flex items-center justify-center'>
					<DialogTitle>Create new post</DialogTitle>
					{state.status === 500 && (
						<DialogDescription className='text-red-400'>
							{state.message}
						</DialogDescription>
					)}
					{state.status === 200 && (
						<DialogDescription className='text-green-400'>
							{state.message}
						</DialogDescription>
					)}
				</DialogHeader>

				<form
					className='w-full grid grid-cols-1 md:grid-cols-5 gap-5'
					action={dispatch}>
					{/* action button */}
					<div className='flex items-center justify-start col-span-1 md:col-span-5 border-b pb-2 mb-2'>
						<Button type='submit'>Update</Button>
						<Button
							type='button'
							variant='secondary'
							onClick={() => closeModel()}>
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
								defaultValue={blog.title}
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
								defaultValue={blog.author}
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
								defaultValue={blog.summary}
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
								defaultValue={blog.keywords!}
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
								defaultValue={blog.content!}
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
							) : (
								<Image
									src={`${host}${blog.thumbnailImage}`}
									width={'600'}
									height={'600'}
									alt='preview'
								/>
							)}
						</div>

						<div className='flex flex-col items-start justify-start mb-8'>
							<h3 className='p-0'>{author}</h3>
							{keywords && <h3 className='italic m-0'>Keywords: {keywords}</h3>}
						</div>
						<div className='flex'>{abstract}</div>
						<Markdown className='content-preview blog-content'>
							{content}
						</Markdown>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
