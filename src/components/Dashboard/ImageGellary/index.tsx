/** @format */

import React from 'react';
import AddNewImage from './add-new-image';
import { getImageGellary } from '@/methods/image-gellary-method';
import ImageCard from './image-card';

export default async function ImageGellaryComponent() {
	const get_gellary = await getImageGellary();
	const host = process.env.HOST!;
	return (
		<div className='w-full p-4'>
			<AddNewImage />
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4'>
				{get_gellary.map((image, index) => (
					<ImageCard key={index} imageInfo={image} host={host} />
				))}
			</div>
		</div>
	);
}
