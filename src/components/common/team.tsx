/** @format */

import React from 'react';
import SectionHeader from './section-header';
import MemberCard from './member-card';

import { Members } from '@/lib/static_data';
import ContentWrapper from './content-wrapper';
import { getTeam } from '@/methods/users-method';
import { cn } from '@/lib/utils';

export default async function Team({
	title,
	className,
	titleStyles,
}: {
	title: string;
	className?: string;
	titleStyles?: string;
}) {
	const team = await getTeam();
	return (
		<section className={cn('w-full py-16', className)}>
			<ContentWrapper>
				{/* section header */}
				<div className='flex items-center justify-start'>
					<SectionHeader title={title} className={titleStyles} />
				</div>
				<div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 md:px-0'>
					{team.map((member, index) => (
						<MemberCard
							key={index}
							name={member.name!}
							profession={member.designation!}
							imageUrl={member.avatar!}
							socialLinks={[]}
							summary={member.description!}
							profileUrl={''}
							education={member.education!}
						/>
					))}
				</div>
			</ContentWrapper>
		</section>
	);
}
