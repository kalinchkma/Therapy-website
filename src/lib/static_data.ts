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
} from './definitions';

export const NavigationLinks: NavigationLink[] = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'Services',
		path: '/services',
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
	},
	{
		name: 'Our Packages',
		path: '/packages',
	},
	{
		name: 'Blog',
		path: '/blog',
	},
	{
		name: 'Contact',
		path: '/contact',
	},
	{
		name: 'About',
		path: '/about',
	},
	{
		name: 'Shop',
		path: '/shop',
	},
];

export const IgnoreNavigation: string[] = ['/login', '/signup', '/dashboard'];

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
