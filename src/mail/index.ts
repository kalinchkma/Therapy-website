/** @format */

'use strict';

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: Number(EMAIL_PORT),
	secure: true,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS,
	},
});

export async function sendMail({
	to,
	subject,
	res,
}: {
	to: string;
	subject: string;
	res: string;
}) {
	try {
		const info = await transporter.sendMail({
			from: EMAIL_USER,
			to: to,
			subject: subject,

			html: res,
		});
		info;
		return true;
	} catch (error) {
		return false;
	}
}
