/** @format */

import { deletePackage } from '@/actions/packages-actions';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import React from 'react';

export default function DeletePackage({ id }: { id: number }) {
	const delete_packages = deletePackage.bind(null, id);
	return (
		<form action={delete_packages}>
			<Button variant='destructive' size='icon'>
				<Trash2 />
			</Button>
		</form>
	);
}
