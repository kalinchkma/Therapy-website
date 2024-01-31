/** @format */

import { clearCookie } from '@/actions/auth-actions';
import React from 'react';

export default function PageNotFound() {
	return (
		<div className='w-full h-[80vh] flex items-center justify-center'>
			<form
				action={clearCookie}
				className='flex flex-col items-center justify-center'>
				<h1 className='text-2xl mb-4'>
					Something Crazy happenning!
					<br /> Please whatever you doing{' '}
				</h1>
				<button
					type='submit'
					className='py-2 px-4 bg-red-400 text-white rounded-sm'>
					Try again
				</button>
			</form>
		</div>
	);
}
