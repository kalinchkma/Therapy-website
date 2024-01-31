/** @format */

import React from 'react';
import ContentWrapper from './content-wrapper';

import IconCreator from './icon-creator';
import { IconType } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PageBreadcrumbProps {
	className?: string;
	paths: {
		name: string;
		url?: string;
	}[];
}

export default function PageBreadcrumb({
	paths,
	className,
}: PageBreadcrumbProps) {
	return (
		<div className={cn('w-full py-5 border-b', className)}>
			<ContentWrapper className='flex items-center justify-start'>
				<ul className='flex items-center gap-3'>
					{paths.map((path, index) => {
						if (index < paths.length - 1) {
							return (
								<React.Fragment key={index}>
									<li>
										<Link href={path.url!} className='text-base text-zinc-400'>
											{path.name}
										</Link>
									</li>
									<li>
										<IconCreator
											icon={IconType.RightArrow}
											className='text-zinc-400'
										/>
									</li>
								</React.Fragment>
							);
						}
						return (
							<li key={index}>
								<p className='font-bold text-purple-600'>{path.name}</p>
							</li>
						);
					})}
				</ul>
			</ContentWrapper>
		</div>
	);
}
