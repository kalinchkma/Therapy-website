/** @format */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthTokenData } from '@/lib/definitions';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// hash password
export async function hash_password(password: string) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (error) {
		return false;
	}
}

// verify hash password
export async function verify_password(password: string, hash_password: string) {
	try {
		const res = await bcrypt.compare(password, hash_password);
		return res;
	} catch (error) {
		return false;
	}
}

// create authentication token
export async function create_auth_token(data: AuthTokenData, secret: string) {}
