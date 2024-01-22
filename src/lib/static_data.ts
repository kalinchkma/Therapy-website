/** @format */

import { NavigationLink, SocialLink, IconType } from './definitions';

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
