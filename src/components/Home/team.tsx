/** @format */

import React from 'react';
import SectionHeader from '../common/section-header';
import MemberCard from '../common/member-card';

import { Members } from '@/lib/static_data';
import ContentWrapper from '../common/content-wrapper';

export default function Team() {
	return (
		<section className='w-full py-16'>
			<ContentWrapper>
				{/* section header */}
				<div className='flex items-center justify-start'>
					<SectionHeader title='Meet our Team' />
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
