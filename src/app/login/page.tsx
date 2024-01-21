/** @format */

import LoginFrom from '@/components/login-form';

export default function LoginPage() {
	return (
		<div className='flex flex-row w-full md:container justify-center items-center h-[100vh]'>
			{/* TODO: Make a bueautifull style */}
			{/* <div className='flex-grow hidden md:flex'></div> */}
			<LoginFrom />
		</div>
	);
}
