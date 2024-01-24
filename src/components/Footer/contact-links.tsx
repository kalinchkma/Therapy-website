/** @format */

import React from 'react';
import SocialLinkCreator from '../common/social-link';

import { SocialLinks } from '@/lib/static_data';

export default function ContactLink() {
	return (
		<div className='w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4'>
			<div className='col-span-1'>
				<ul className='flex gap-3'>
					{SocialLinks.map((link) => (
						<li key={link.title + link.link}>
							<SocialLinkCreator
								icon={link.icon}
								link={link.link}
								className='text-zinc-400 text-3xl hover:text-zinc-200 transition-colors'
							/>
						</li>
					))}
				</ul>
			</div>
			<div className='col-span-1'>
                
            </div>
			<div className='col-span-1'></div>
		</div>
	);
}
