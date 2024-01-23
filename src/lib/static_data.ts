/** @format */

import {
	NavigationLink,
	SocialLink,
	IconType,
	BannserSliderItemType,
	ServiceType,
} from './definitions';

export const NavigationLinks: NavigationLink[] = [
	{
		name: 'Home',
		path: '/',
	},
	{
		name: 'Service',
		path: '/service',
	},
	{
		name: 'Service Area',
		path: '/service-area',
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
