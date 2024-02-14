/** @format */

import BookPackagePageComponent from '@/components/packages/book-package';
import { getPackageById } from '@/methods/packages-method';
import React from 'react';

export default async function BookPackagePage({
	params,
}: {
	params: { id: number };
}) {
	const p = await getPackageById(params.id);

	return (
		<div className='w-full'>
			<BookPackagePageComponent p={p} />
		</div>
	);
}
