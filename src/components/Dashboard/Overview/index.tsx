/** @format */

import { getBlogsForAdmin } from '@/methods/blog-method';
import { getMessages } from '@/methods/message-method';
import { fetchAllProduct } from '@/methods/product-method';
import { getAllServices } from '@/methods/services-method';
import React from 'react';

export default async function OverviewPageComponent() {
	const products = await fetchAllProduct();
	const services = await getAllServices();
	const messages = await getMessages();
	const blog_posts = await getBlogsForAdmin();
	return (
		<div className='w-full p-4'>
			<div className='grid md:grid-cols-3 gap-5'>
				<div className='flex items-center justify-center box-border p-10 bg-red-400 text-xl text-white font-semibold'>
					<h4>Total Products: </h4>
					<span className='font-bold ml-2'>{products.length}</span>
				</div>

				<div className='flex items-center justify-center box-border p-10 bg-green-600 text-xl text-white font-semibold'>
					<h4>Total Services: </h4>
					<span className='font-bold ml-2'>
						{services ? services.length : 0}
					</span>
				</div>
				<div className='flex items-center justify-center box-border p-10 bg-red-400 text-xl text-white font-semibold'>
					<h4>Messages: </h4>
					<span className='font-bold ml-2'>{messages.length}</span>
				</div>
				<div className='col-span-3 flex items-center justify-center box-border p-10 bg-yellow-400 text-xl text-white font-semibold'>
					<h4>Total blog post: </h4>
					<span className='font-bold ml-2'>{blog_posts.length}</span>
				</div>
			</div>
		</div>
	);
}
