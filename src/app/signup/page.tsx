/** @format */

import SignupForm from '@/components/signup-form';
import { checkAndGetAuth } from '@/lib/helper_function';
import { redirect } from 'next/navigation';

export default async function SignupPage() {
	const auth = await checkAndGetAuth();
	if (auth === '/404') {
		redirect(auth);
	} else if (auth !== '/login') {
		redirect('/');
	}
	return (
		<div className='flex flex-row w-full md:container justify-center items-center h-[100vh]'>
			{/* TODO: Make a bueautifull style */}
			{/* <div className='flex-grow hidden md:flex'></div> */}
			<SignupForm />
		</div>
	);
}
