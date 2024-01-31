/** @format */

import React from 'react';
import SectionHeader from './section-header';
import MemberCard from './member-card';

import { Members } from '@/lib/static_data';
import ContentWrapper from './content-wrapper';

export default function Team({ title }: { title: string }) {
	return (
		<section className='w-full py-16'>
			<ContentWrapper>
				{/* section header */}
				<div className='flex items-center justify-start'>
					<SectionHeader title={title} />
				</div>
				<div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{Members.map((member) => (
						<MemberCard
							key={member.name}
							name={member.name}
							profession={member.profession}
							imageUrl={member.imageUrl}
							socialLinks={member.socialLinks}
							summary={member.summary}
							profileUrl={member.profileUrl}
						/>
					))}
				</div>
			</ContentWrapper>
		</section>
	);
}
