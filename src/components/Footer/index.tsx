/** @format */

import React from 'react';
import ContentWrapper from '../common/content-wrapper';
import ContactLink from './contact-links';

export default function Footer() {
	return (
		<footer className='w-full py-14 bg-zinc-700'>
			<ContentWrapper>
				{/* Contact links */}
				<ContactLink />
			</ContentWrapper>
		</footer>
	);
}
