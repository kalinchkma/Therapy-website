/** @format */

'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='flex flex-col items-center justify-center py-10'>
			<h2>Something went wrong!</h2>
			<button
				className='py-2 px-4 bg-red-500 font-bold text-white'
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}>
				Try again
			</button>
		</div>
	);
}
