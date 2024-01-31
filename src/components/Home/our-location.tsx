/** @format */

import React from 'react';

export default function OurLocation() {
	return (
		<section className='w-full'>
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.332283741445!2d90.36720527468471!3d23.806780378631956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13e08c8960f%3A0x67e4334fdb0b1a1a!2sUniversal%20Physiotherapy%20%26%20Rehab%20Center!5e0!3m2!1sen!2sbd!4v1706057799374!5m2!1sen!2sbd'
				className='w-[100%] h-[450px]'
				allowFullScreen={true}
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'></iframe>
		</section>
	);
}
