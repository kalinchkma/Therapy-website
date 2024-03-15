/** @format */

import React from 'react';
import SetupInformation from './setup-information';
import { getInformations } from '@/methods/information-method';

import UpdateInformation from './update-information';

export default async function ManageInformationPageComponent() {
	const information = await getInformations();

	return (
		<div className='w-full p-4'>
			<div className='w-full pb-5'>
				{information?.length <= 0 ? (
					<SetupInformation />
				) : (
					<UpdateInformation
						information={information}
						host={process.env.HOST!}
					/>
				)}
			</div>
		</div>
	);
}
