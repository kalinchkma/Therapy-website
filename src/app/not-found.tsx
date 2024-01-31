/** @format */

import IconCreator from '@/components/common/icon-creator';
import { IconType } from '@/lib/definitions';

export default function NotFound() {
	return (
		<div className='w-full flex flex-col items-center justify-center h-[60vh]'>
			<IconCreator icon={IconType.Sad} className='h-20 w-20 text-purple-800' />
			<h2 className='text-2xl text-zinc-400 flex items-end gap-3'>
				Service Not Found
			</h2>
		</div>
	);
}
