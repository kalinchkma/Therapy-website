/** @format */

import {
	NavigationLink,
	SocialLink,
	IconType,
	BannserSliderItemType,
	ServiceType,
	MemberType,
	Contact,
	ContactType,
	OpenningHourType,
	ServiceAreaType,
	PackageType,
	PackageDescriptionType,
	MoneyType,
	BlogPostType,
	PostDataType,
	BlogKeywords,
	DashboardNavigationType,
} from './definitions';

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const HOST = process.env.HOST;

export const NavigationLinks: NavigationLink[] = [
	{
		name: 'Home',
		path: '/',
		dashboardPath: '/dashboard/pages/home',
	},
	{
		name: 'Services',
		path: '/services',
		dashboardPath: '/dashboard/pages/services',
		nestedLinks: [
			{
				name: 'Physio Therapy',
				path: '/physio-therapy',
			},
			{
				name: 'Massage Therapy',
				path: '/massage-therapy',
			},
			{
				name: 'Sport Injury',
				path: '/sport-injury',
			},
			{
				name: 'Chronical Disease',
				path: '/chronical',
			},
			{
				name: 'Ebnormal moute',
				path: '/',
			},
		],
	},
	{
		name: 'Service Area',
		path: '/service-area',
		dashboardPath: '/dashboard/pages/service-area',
	},
	{
		name: 'Our Packages',
		path: '/packages',
		dashboardPath: '/dashboard/pages/packages',
	},
	{
		name: 'Blog',
		path: '/blog',
		dashboardPath: '/dashboard/pages/blog',
	},
	{
		name: 'Contact',
		path: '/contact',
		dashboardPath: '/dashboard/pages/contact',
	},
	{
		name: 'About',
		path: '/about',
		dashboardPath: '/dashboard/pages/about',
	},
	{
		name: 'Shop',
		path: '/shop',
		dashboardPath: '/dashboard/pages/shop',
	},
];

export const IgnoreNavigation: string[] = ['/login', '/signup', '/dashboard'];
export const IgnoreFooter: string[] = ['/login', '/signup', '/dashboard'];

export const SocialLinks: SocialLink[] = [
	{
		title: 'Facebook',
		link: 'https://facebook.com',
		icon: IconType.Facebook,
	},
	{
		title: 'LinkedIn',
		link: 'https://facebook.com',
		icon: IconType.LinkedIn,
	},
	{
		title: 'Twitter',
		link: 'https://facebook.com',
		icon: IconType.XTwitter,
	},
	{
		title: 'Youtube',
		link: 'https://facebook.com',
		icon: IconType.YouTube,
	},
	{
		title: 'WhatsApp',
		link: 'https://facebook.com',
		icon: IconType.WhatsApp,
	},
];

// banner slide test data
export const BannserSlideData: BannserSliderItemType[] = [
	{
		title: 'A practice built on honesty and integrity',
		secondaryTitle: 'GOAL-ORIENTED APPROACH',
		btnLink: '/subscribe',
		btnTitle: 'Get In Touch',
		slideImage: '/images/slide1.jpg',
	},
	{
		title: 'We are a unique physical therapy clinic',
		secondaryTitle: 'COMMITTED TO HELPING',
		btnLink: '/about',
		btnTitle: 'More About Us',
		slideImage: '/images/slide2.jpg',
	},
	{
		title: 'We offer highly specialized treatments',
		secondaryTitle: 'HELPING YOU LIVE LIFE',
		btnTitle: 'Services',
		btnLink: '/service',
		slideImage: '/images/slide3.jpg',
	},
	{
		title: 'We’ve been in business since 1996',
		secondaryTitle: 'SUPERIOR EXPERTISE',
		btnTitle: 'Book Appointment',
		btnLink: '/appointment',
		slideImage: '/images/slide4.jpg',
	},
];

// services
export const Services: ServiceType[] = [
	{
		title: 'Physical Therapy',
		description:
			'Your first appointment will be no different from the usual osteopathic consultation and evaluation (see osteopathy page). You will be asked specific questions related to your particular sport or even to demonstrate some movements. Your diagnosis and treatment plan will be discussed in the usual way.Treatment is likely to involve the use of osteopathic techniques within the treatment room combined with a more specific exercise based program in the studio gym. The aim is to return to full physical activity.',
		thumbnailImage: '/images/service1.jpg',
		serviceLink: '/service',
	},
	{
		title: 'Sport Injuries',
		description:
			'Your first appointment will be no different from the usual osteopathic consultation and evaluation (see osteopathy page). You will be asked specific questions related to your particular sport or even to demonstrate some movements. Your diagnosis and treatment plan will be discussed in the usual way.Treatment is likely to involve the use of osteopathic techniques within the treatment room combined with a more specific exercise based program in the studio gym. The aim is to return to full physical activity.',
		thumbnailImage: '/images/service2.jpg',
		serviceLink: '/service',
	},
	{
		title: 'Work Injuries',
		description:
			'Your first appointment will be no different from the usual osteopathic consultation and evaluation (see osteopathy page). You will be asked specific questions related to your particular sport or even to demonstrate some movements. Your diagnosis and treatment plan will be discussed in the usual way.Treatment is likely to involve the use of osteopathic techniques within the treatment room combined with a more specific exercise based program in the studio gym. The aim is to return to full physical activity.',
		thumbnailImage: '/images/service3.jpg',
		serviceLink: '/service',
	},
	{
		title: 'Message Therapy',
		description:
			'Your first appointment will be no different from the usual osteopathic consultation and evaluation (see osteopathy page). You will be asked specific questions related to your particular sport or even to demonstrate some movements. Your diagnosis and treatment plan will be discussed in the usual way.Treatment is likely to involve the use of osteopathic techniques within the treatment room combined with a more specific exercise based program in the studio gym. The aim is to return to full physical activity.',
		thumbnailImage: '/images/service3.jpg',
		serviceLink: '/service',
	},
	{
		title: 'Message Therapy',
		description:
			'Your first appointment will be no different from the usual osteopathic consultation and evaluation (see osteopathy page). You will be asked specific questions related to your particular sport or even to demonstrate some movements. Your diagnosis and treatment plan will be discussed in the usual way.Treatment is likely to involve the use of osteopathic techniques within the treatment room combined with a more specific exercise based program in the studio gym. The aim is to return to full physical activity.',
		thumbnailImage: '/images/service3.jpg',
		serviceLink: '/service',
	},
];

// semple members
export const Members: MemberType[] = [
	{
		name: 'Md. Musfik',
		imageUrl: '/images/service1.jpg',
		profession: 'Physio therapist',
		socialLinks: [
			{
				icon: IconType.Facebook,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
		],
		profileUrl: '/musfik',
		summary:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance',
	},
	{
		name: 'Hunter Kalin',
		imageUrl: '/images/service2.jpg',
		profession: 'Cutting Master',
		socialLinks: [
			{
				icon: IconType.Twitter,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
		],
		profileUrl: '/musfik',
		summary:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance',
	},
	{
		name: 'Md. Shahid Afridi',
		imageUrl: '/images/service4.jpg',
		profession: 'Eating master',
		socialLinks: [
			{
				icon: IconType.LinkedIn,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
		],
		profileUrl: '/musfik',
		summary:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance',
	},
	{
		name: 'Md. Motu',
		imageUrl: '/images/service3.jpg',
		profession: 'Cooking master',
		socialLinks: [
			{
				icon: IconType.Facebook,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
		],
		profileUrl: '/musfik',
		summary:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance',
	},
	{
		name: 'Md. Maruf',
		imageUrl: '/images/service1.jpg',
		profession: 'Massage therapist',
		socialLinks: [
			{
				icon: IconType.Instagram,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
			{
				icon: IconType.Facebook,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
			{
				icon: IconType.LinkedIn,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
			{
				icon: IconType.Twitter,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
			{
				icon: IconType.YouTube,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
		],
		profileUrl: '/musfik',
		summary:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance',
	},
	{
		name: 'Md. Kamrujamman',
		imageUrl: '/images/service2.jpg',
		profession: 'Chiropractor',
		socialLinks: [
			{
				icon: IconType.Facebook,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
			{
				icon: IconType.Instagram,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
			{
				icon: IconType.Twitter,
				link: 'https://facebook.com',
				title: 'Facebook',
			},
		],
		profileUrl: '/musfik',
		summary:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance',
	},
];

// contact data
export const ContactData: Contact[] = [
	{
		title: 'Location',
		type: ContactType.Location,
		icon: IconType.Location,
		location: {
			title: 'Visit our location',
			details:
				'Universal Physiotherapy & Rehab Center 02 , 2nd Floor, House: 09 , Road:, 2/B Mirpur 10 Roundabout, Dhaka 1216',
		},
	},
	{
		title: 'Contact',
		type: ContactType.contact,
		contact: {
			title: 'Easy way to Contact',
			emails: {
				icon: IconType.Email,
				title: 'Mail Us',
				data: ['maruf@gmail.com', 'musfque@gmail.com', 'uprc@gmail.com'],
			},
			phoneNumbers: {
				title: 'Give us Call',
				data: ['+880112345123423', '+8801652341236'],
				icon: IconType.Contact,
			},
		},
		icon: IconType.Contact,
	},
];

// openning hours
export const OpenningHours: OpenningHourType[] = [
	{
		day: 'Friday',
		openningHours: '9:00am - 10:00pm',
	},
	{
		day: 'Saturday',
		openningHours: '9:00am - 10:00pm',
	},
	{
		day: 'Sunday',
		openningHours: '9:00am - 10:00pm',
	},
	{
		day: 'Monday',
		openningHours: '9:00am - 10:00pm',
	},
	{
		day: 'Tuesday',
		openningHours: '9:00am - 10:00pm',
	},
	{
		day: 'Wednessday',
		openningHours: '9:00am - 10:00pm',
	},
	{
		day: 'Thursday',
		openningHours: '9:00am - 10:00pm',
	},
];

// service area
export const ServiceAreas: ServiceAreaType[] = [
	{
		area: 'Gulshan Area',
		areaList: ['Gulshan 1', 'Gulshan 2', 'Baridhara DOHS'],
	},
	{
		area: 'Mirpur',
		areaList: [
			'Mirpur 10',
			'Kazipara',
			'Shorapara',
			'Shorapara something like',
		],
	},
	{
		area: 'Bonani',
		areaList: ['Mirpur 10', 'Kazipara', 'Shorapara'],
	},
	{
		area: 'Kolabagan',
		areaList: ['Mirpur 10', 'Kazipara', 'Shorapara'],
	},
	{
		area: 'Firmgate',
		areaList: ['Mirpur 10', 'Kazipara', 'Shorapara'],
	},
];

// blog post
export const BlogPosts: BlogPostType[] = [
	{
		title: 'This is the title',
		author: 'Musfique',
		blogLink: '/',
		comments: ['jhahsd', 'KAJHd', 'jkhaksjnd'],
		comments_count: 3,
		description:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance.',
		thumbnilImage: '/images/slide2.jpg',
		keywords: ['Physio therapy', 'Message'],
		postData: [],
	},
	{
		title: 'Proud to offer a wide range of comprehensive services',
		author: 'Maruf',
		blogLink: '/',
		comments: ['jhahsd', 'KAJHd', 'jkhaksjnd'],
		comments_count: 3,
		description:
			'We are proud to offer a wide range of comprehensive services to meet the needs of adults, seniors, and pediatric patients. Our team of professional caregivers specialize in providing personalized medical care, rehabilitative therapy and companion assistance.',
		thumbnilImage: '/images/slide3.jpg',
		keywords: ['Physio therapy', 'Message'],
		postData: [],
	},
];

// blog keyword
export const Keywords: BlogKeywords[] = [
	{
		name: 'Physiotherapy',
	},
	{
		name: 'Massage Therapy',
	},
	{
		name: 'Stroke',
	},
	{
		name: 'Chronotherapy',
	},
];

// Dahsboard Navigation
export const DashboardNavigation: DashboardNavigationType[] = [
	{
		title: 'Overview',
		link: '/dashboard',
		icon: IconType.Overview,
	},
	{
		title: 'pages',
		link: '/dashboard/pages/home',
		icon: IconType.Pages,
	},
	{
		title: 'Customer review',
		link: '/dashboard/customer-review',
		icon: IconType.Post,
	},
	{
		title: 'manage users',
		link: '/dashboard/users',
		icon: IconType.UserSettings,
	},

	{
		title: 'services',
		link: '/dashboard/services',
		icon: IconType.Services,
	},
	{
		title: 'service area',
		link: '/dashboard/services-area',
		icon: IconType.Schedule,
	},
	{
		title: 'Manage packages',
		link: '/dashboard/manage-packages',
		icon: IconType.Reports,
	},
	{
		title: 'manage shop',
		link: '/dashboard/manage-shop',
		icon: IconType.Shop,
	},
	{
		title: 'ordered',
		link: '/dashboard/ordered',
		icon: IconType.Ordered,
	},
	{
		title: 'Blog Post',
		link: '/dashboard/blog-post',
		icon: IconType.Post,
	},
	{
		title: 'messages',
		link: '/dashboard/messages',
		icon: IconType.Message,
	},
	{
		title: 'appointments',
		link: '/dashboard/appointments',
		icon: IconType.Appointments,
	},
	{
		title: 'manage information',
		link: '/dashboard/manage-information',
		icon: IconType.Schedule,
	},
	{
		title: 'Visite Website',
		link: '/',
		icon: IconType.House,
	},
];
