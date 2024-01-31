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
export async function create_auth_token(data: AuthTokenData) {
	try {
		const token = await jwt.sign(data, process.env.SECRET!, {
			algorithm: 'HS512',
		});
		return token;
	} catch (error) {
		return false;
	}
}

// verify auth token
export async function verify_auth_token(token: string) {
	try {
		const decode_token = await jwt.verify(token, process.env.SECRET!);
		return decode_token;
	} catch (error) {
		return false;
	}
}

export async function verify_auth_token2(token: string) {
	try {
		await jwt.verify(token!, process.env.SECRET!);
		return true;
	} catch (error) {
		return false;
	}
}
