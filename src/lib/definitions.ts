/** @format */

// auth token name
export const AuthTokenName: string = 'Bearer';

// App user type
export enum UsersType {
	'admin' = '872137232',
	'super-admin' = '9817238972',
	'client' = '1287398721',
}

// Login user type
export type User = {
	name: string;
	email: string;
	password: string;
	user_type: UsersType | null;
};

// auth token data
export type AuthTokenData = {
	name: string;
	email: string;
};

// navigation
export type NavigationLink = {
	name: string;
	path: string;
	nestedLinks?: {
		name: string;
		path: string;
	}[];
};

// icon type
export enum IconType {
	'Facebook' = 'facebook',
	'XTwitter' = 'xtwitter',
	'Twitter' = 'twitter',
	'LinkedIn' = 'linkedIn',
	'YouTube' = 'youtube',
	'WhatsApp' = 'whatsapp',
	'Instagram' = 'instagram',
	'Location' = 'location',
	'Message' = 'message',
	'House' = 'house',
	'Email' = 'email',
	'Contact' = 'contact',
	'LeftArrow' = 'leftarrow',
	'RightArrow' = 'rightarrow',
	'Schedule' = 'schedule',
}

// social links
export interface SocialLink {
	title?: string;
	link: string;
	icon: IconType;
}

// banner slider content
export type BannserSliderItemType = {
	title: string;
	secondaryTitle: string;
	btnTitle: string;
	btnLink: string;
	slideImage?: string;
};

// service type
export type ServiceType = {
	title: string;
	description: string;
	thumbnailImage: string;
	serviceLink: string;
};

// members type
export type MemberType = {
	imageUrl: string;
	socialLinks: SocialLink[];
	name: string;
	profession: string;
	summary: string;
	profileUrl: string;
	education?: string;
};

// opening types
export type OpenningHourType = {
	day: string;
	openningHours: string;
};

export enum ContactType {
	'Location' = 'location',
	'contact' = 'contact',
}

export type Contact = {
	title: string;
	type: ContactType;
	contact?: {
		title: string;
		emails?: {
			title: string;
			data: string[];
			icon?: IconType;
		};
		phoneNumbers?: {
			title: string;
			data: string[];
			icon?: IconType;
		};
	};
	location?: {
		title: string;
		details: string;
	};
	icon?: IconType;
};

// web information
export type WebInfo = {
	title: string;
	description: string;
	links: NavigationLink[];
};

// service area
export type ServiceAreaType = {
	area: string;
	areaList: string[];
};

export enum PackageType {
	'DAILY' = 'Day',
	'MONTHLY' = 'Month',
	'YEARLY' = 'Year',
	'WEEKLY' = 'Week',
}

export enum MoneyType {
	'DOLLER' = 'doller',
	'TAKA' = 'taka',
}

// package types
export type PackageDescriptionType = {
	title: string;
	description: string;
	offers?: number;
	price: number;
	moneyType: MoneyType;
	packageType: PackageType;
	packageLink: string;
	packageDetails: {
		title: string;
		description: string[];
	};
};
