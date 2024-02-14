/** @format */

import React from 'react';
import CreateNewBlog from './create-new-blog';

export default function BlogPostComponent() {
	return (
		<div className='w-full p-4'>
			<CreateNewBlog />
			<div className='grid grid-cols-4'></div>
		</div>
	);
}
