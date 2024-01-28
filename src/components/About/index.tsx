/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import Image from 'next/image';
import Team from '../common/team';

export default function AboutPageComponent() {
	return (
		<div className='w-full'>
			<PageTitle
				title='About Us'
				description='We offer physiotherapy service since 2017'
			/>
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'About us', url: '/about' },
				]}
			/>
			<ContentWrapper className='py-12'>
				<div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='col-span-1'>
						<div className='flex w-full flex-col pb-5'>
							<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
								আমরা কারা
							</h4>
							<p className='text-zinc-600 text-base leading-relaxed'>
								ফিজিওথেরাপি চিকিৎসা বিজ্ঞানের একটি নতুন শাখা । অপ্রতুল
								ফিজিওথেরাপিস্ট থাকার জন্য রোগীরা অনেক ক্ষেত্রেই সঠিক ফিজিওথেরাপি
								চিকিৎসা সেবা থেকে বঞ্চিত হচ্ছেন এবং বৃথা অর্থ নষ্ট করছেন।
								বিশেষজ্ঞ ফিজিওথেরাপিস্টদের মাধ্যমে রোগীদের সঠিক সেবা নিশ্চিত
								করতে ফিজিও সেবা নিরলস ভাবে কাজ করছে।
							</p>
						</div>
						<div className='flex w-full flex-col pb-5'>
							<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
								উদ্দেশ্য
							</h4>
							<p className='text-zinc-600 text-base leading-relaxed'>
								সুস্বাস্থ্য ও কর্মক্ষম জীবন নিশ্চিত করতে ফিজিওথেরাপি চিকিৎসার
								গুরুত্ব অপরিসীম । নানারকম শারীরিক জটিলতার শিকার অনেকেই ওষুধে
								আরোগ্য হন না, সেসব রোগীর জন্য ফিজিওথেরাপি অত্যাবশ্যক।এরকম একটি
								জাতীয় ইস্যুকে সহজে সবার দোর গোড়ায় পৌঁছানো আমাদের দায়িত্ব মনে করি
								।
							</p>
						</div>
						<div className='flex w-full flex-col pb-5'>
							<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
								ফিজিও সেবা কি করে?
							</h4>
							<p className='text-zinc-600 text-base leading-relaxed'>
								অভিজ্ঞ এবং ডিগ্রিধারী বিশেষজ্ঞ ফিজিওথেরাপিস্টদের মাধ্যমে রোগীদের
								সঠিক সেবা নিশ্চিত করতেই আমাদের এই অনলাইন প্লাটফর্ম ।
							</p>
						</div>
					</div>
					{/* right side */}
					<div className='col-span-2'>
						<div className='flex flex-col w-full md:flex-row gap-2'>
							<div className='flex flex-col flex-grow'>
								<div className='flex flex-col pb-5'>
									<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
										আমাদের সম্পর্কে
									</h4>
									<p className='text-zinc-600 text-base leading-relaxed'>
										আধুনিক চিকিৎসা ব্যবস্থায় ফিজিওথেরাপি যথেষ্ট প্রাধান্য
										পাচ্ছে | সব রোগ ঔষধে ভালো হয় না | অনেক ক্ষেত্রে ঔষধের
										পাশাপাশি অথবা ওষুধের বিকল্প হিসেবে ফিজিওথেরাপি খুবই
										গুরুত্বপূর্ণ ভূমিকা পালন করে | সঠিক সময়ে, সঠিক এবং অভিজ্ঞ
										ফিজিওথেরাপিস্ট খুঁজে পাওয়াটা খুবই কঠিন বিষয় | অনেক
										ক্ষেত্রেই ফিজিওথেরাপিস্টদের কোয়ালিটি নিয়ে সন্দেহ থাকে |
										অথবা ভালো ফিজিওথেরাপিস্ট সবসময় হাতের কাছে পাওয়া যায় না |
										অনেক সময় বিশেষজ্ঞ ফিজিওথেরাপিস্টও তাদের সেবা রোগী পর্যন্ত
										পৌঁছে দিতে পারেনা | ফিজিও চাই এর উদ্দেশ্যই হল বিশেষজ্ঞ
										ফিজিওথেরাপিস্ট যেন রোগীদের মানসম্পন্ন সেবা দিতে পারে,
										অন্যদিকে রোগীরাও যেন সঠিক এবং মানসম্মত সেবা পেতে পারে |
									</p>
								</div>
								<div className='flex flex-col pb-5'>
									<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
										উচ্চ গুনসম্পন্ন
									</h4>
									<p className='text-zinc-600 text-base leading-relaxed'>
										আমরা নিরাময়ের জন্য একটি লক্ষ্য-ভিত্তিক পদ্ধতি গ্রহণ করি।
										আপনার লক্ষ্য যাই হোক না কেন আমরা আপনাকে সেগুলি অর্জনে
										সহায়তা করতে চাই
									</p>
								</div>
								<div className='flex flex-col pb-5'>
									<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
										রোগীদের যত্ন
									</h4>
									<p className='text-zinc-600 text-base leading-relaxed'>
										আমরা অফিসে হ্যান্ডস-অন চিকিৎসা প্রদান করব এবং শিক্ষা যা আপনি
										আপনার সাথে বাড়িতে নিয়ে যেতে পারেন, আপনাকে আপনার পুনরুদ্ধার
										এবং ভবিষ্যতের শারীরিক স্বাস্থ্যে সক্রিয় অংশগ্রহণকারী হতে
										সক্ষম করে।
									</p>
								</div>
								<div className='flex flex-col pb-5'>
									<h4 className='text-zinc-800 font-bold text-2xl mb-2'>
										পেশাগত সেবা
									</h4>
									<p className='text-zinc-600 text-base leading-relaxed'>
										আমাদের পাঁচজন শারীরিক থেরাপিস্টের 120 বছরের ক্লিনিকাল
										অভিজ্ঞতা এবং আমাদের সম্প্রদায়কে সক্রিয় থাকতে সাহায্য করার
										জন্য একটি ভাগ করা আবেগ রয়েছে।
									</p>
								</div>
							</div>
							<div className='flex-grow h-full pb-5'>
								<Image
									src={'/images/about_us.jpg'}
									width={'300'}
									height={'400'}
									alt='about image'
									className='min-h-[100%] min-w-[400px]'
								/>
							</div>
						</div>
					</div>
				</div>
			</ContentWrapper>
			{/* Team section */}
			<Team title='Our Team' />
		</div>
	);
}
