/** @format */

import React from 'react';
import Image from 'next/image';
import SocialLinkCreator from './social-link';
import MoreBtn from './more-btn';
import { MemberType } from '@/lib/definitions';
import { cn } from '@/lib/utils';

interface MemberCardProps extends MemberType {
	className?: string;
	education?: string;
}

export default function MemberCard({
	name,
	profession,
	summary,
	imageUrl,
	profileUrl,
	socialLinks,
	education,
	className,
}: MemberCardProps) {
	return (
		<div className={cn('w-full border bg-white', className)}>
			<div className='w-full relative'>
				<Image
					src={imageUrl}
					width={'300'}
					height={'300'}
					alt='member image'
					className='h-[250px] w-[100%] object-cover'
				/>
				<div className='absolute flex items-center justify-center w-full h-full top-0 left-0 bg-zinc-700 bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 transition-all duration-500'>
					<ul className='flex items-center justify-center gap-3 flex-wrap'>
						{socialLinks.map((link, index) => (
							<li key={link.link + index + link.title}>
								<SocialLinkCreator
									icon={link.icon}
									link={link.link}
									className='text-white p-3 bg-zinc-800 text-xl flex rounded-full transition-colors hover:bg-blue-400'
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='flex p-5 flex-col'>
				{/* name */}
				<h4 className='text-xl font-bold text-zinc-700 capitalize'>{name}</h4>
				{/* profession */}
				<h5 className='text-base font-bold text-purple-400'>{profession}</h5>
				{/* education */}
				<h5 className='text-base font-bold text-zinc-400'>{education}</h5>
				<hr className='my-5' />
				<p className='line-clamp-4 text-base text-zinc-400'>{summary}</p>
				{/* <div className='flex items-center justify-start'>
					<MoreBtn title='Read more' link={profileUrl} />
				</div> */}
			</div>
		</div>
	);
}
