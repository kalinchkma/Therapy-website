/** @format */

import { drizzle } from 'drizzle-orm/mysql2';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import * as schema from './schema/users';

dotenv.config({ path: '.env.local' });

export const connection = async () => {
	const conn = await mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		multipleStatements: true,
	});
	return conn;
};

export const db = async () => {
	try {
		const database = drizzle(await connection(), {
			mode: 'default',
			schema: schema,
		});

		return database;
	} catch (error) {
		throw Error('Database connection error');
	}
};
