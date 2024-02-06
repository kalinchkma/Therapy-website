/** @format */

import { setupWebInformation } from '@/actions/information-actions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

export default function SetupInformation() {
	return (
		<form action={setupWebInformation}>
			<Button type='submit' className='bg-blue-500 font-bold hover:bg-blue-400'>
				Setup wesite information <Plus />
			</Button>
		</form>
	);
}
