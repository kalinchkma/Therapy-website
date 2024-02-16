/** @format */
'use client';
import React, { useState } from 'react';

import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

export default function BlogSearch({
	setSearchKey,
}: {
	setSearchKey: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
	const handleChange = (s: string) => {
		setSearchKey(s);
	};
	return (
		<div className='flex flex-row mb-8 relative'>
			<input
				type='text'
				placeholder='Search by keyword.....'
				onChange={(e) => handleChange(e.target.value)}
				className='w-full py-2 px-4 outline-none border focus:border-blue-700 transition-all'
			/>
			<div className='absolute right-0 top-0 px-4 h-full w-auto flex items-center justify-center'>
				<Search />
			</div>
		</div>
	);
}
