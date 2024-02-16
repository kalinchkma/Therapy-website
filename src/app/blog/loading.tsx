/** @format */

import React from 'react';

export default function LoadingBlog() {
	return (
		<div className='w-full h-[100vh] flex justify-center items-center'>
			<div className='flex items-center justify-center bg-zinc-300 h-14 w-14 rounded-full'>
				<div className='animate-spin w-14 h-14 bg-white border-b-4 border-blue-400 rounded-full'></div>
			</div>
		</div>
	);
}
