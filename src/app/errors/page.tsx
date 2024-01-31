/** @format */
'use client';
import React from 'react';

export default function Errors() {
	return (
		<div className='w-full h-[60vh] flex flex-col items-center justify-center'>
			<h1 className='text-xl text-red-600'>Something went wrong</h1>
			<button
				className='py-2 px-4 bg-red-400 text-white font-bold text-md mt-8'
				onClick={(e) => {
					window.history.back();
				}}>
				Try again
			</button>
		</div>
	);
}
