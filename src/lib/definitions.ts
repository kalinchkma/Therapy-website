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
};

// social links
export type SocialLink = {
	name: string;
	link: string;
	icon: string;
};
