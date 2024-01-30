/** @format */

import { drizzle } from 'drizzle-orm/mysql2';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import * as schema from './schema/users';

dotenv.config({ path: '.env.local' });

export const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true,
});

export const db = drizzle(connection, {
	mode: 'default',
	schema: schema,
});
