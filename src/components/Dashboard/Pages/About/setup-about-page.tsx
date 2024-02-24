/** @format */

import { setupBanner } from '@/actions/page-banner-actions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

export default function SetupAboutPage() {
	const setup_banner = setupBanner.bind(null, 'about');
	return (
		<form action={setup_banner}>
			<Button type='submit'>
				Setup Banner <Plus />
			</Button>
		</form>
	);
}
