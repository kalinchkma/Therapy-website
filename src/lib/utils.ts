/** @format */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function hash_password(password: string) {
	try {
		const salt = await bcrypt.genSalt(10);

		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (error) {
		return false;
	}
}

export async function verify_password(password: string, hash_password: string) {
	try {
		const res = await bcrypt.compare(password, hash_password);
		return res;
	} catch (error) {
		return false;
	}
}
