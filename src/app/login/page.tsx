/** @format */

import LoginFrom from '@/components/login-form';
import { checkAuth } from '@/lib/helper_function';

export default async function LoginPage() {
	await checkAuth();
	return (
		<div className='flex flex-row w-full md:container justify-center items-center h-[100vh]'>
			{/* TODO: Make a bueautifull style */}
			{/* <div className='flex-grow hidden md:flex'></div> */}
			<LoginFrom />
		</div>
	);
}
