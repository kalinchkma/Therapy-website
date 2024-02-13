/** @format */

// auth token name
export const AuthTokenName: string = 'Bearer';

// App user type
export enum UsersType {
	'admin' = 'Admin',
	'team-member' = 'Team member',
	'client' = 'Client',
	'team-onboard' = 'Team onboard',
}

// Login user type
export type User = {
	id?: string | number;
	name?: string;
	email: string;
	password?: string;
	user_type: UsersType | null;
	designation?: string | null;
	description?: string | null;
	avatar?: string | null;
	education?: string | null;
	createdAt?: Date | null;
	updatedAt?: Date | null;
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
	dashboardPath?: string;
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
	'Star' = 'star',
	'Search' = 'search',
	'Bar' = 'bar',
	'Overview' = 'overview',
	'Users' = 'users',
	'UserSettings' = 'usersettings',
	'Appointments' = 'appointments',
	'Logout' = 'logout',
	'Services' = 'services',
	'Reports' = 'Reports',
	'Post' = 'post',
	'Team' = 'team',
	'Shop' = 'shop',
	'Ordered' = 'ordered',
	'Pages' = 'pages',
	'Sad' = 'sad',
	'Profile' = 'profile',
}

// social links
export interface SocialLink {
	title?: string;
	link: string;
	icon?: IconType;
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
	'DAILY' = 'Daily',
	'MONTHLY' = 'Monthly',
	'YEARLY' = 'Yearly',
	'WEEKLY' = 'Weekly',
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

// blog post

export type PostDataType = {
	text?: string;
	image?: string;
	list?: string;
	video?: string;
};

// blog post type
export type BlogPostType = {
	title: string;
	thumbnilImage: string;
	blogLink: string;
	keywords?: string[];
	author: string;
	description: string;
	comments: string[];
	comments_count: number;
	postData?: PostDataType[];
};

// blog keywords
export type BlogKeywords = {
	name: string;
};

// Dashboard navigation type
export type DashboardNavigationType = {
	title: string;
	link: string;
	icon: IconType;
};
