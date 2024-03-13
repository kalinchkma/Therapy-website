/** @format */

import { drizzle } from 'drizzle-orm/mysql2';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import * as schema from './schema/users';

dotenv.config({ path: '.env.local' });

export const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	multipleStatements: true,
	connectTimeout: 15000,
	connectionLimit: 20,
};

export const connection = mysql.createPool(config);


const logger = process.env.NODE_ENV === 'production' ? false : true;

export const db = drizzle(connection, {
	mode: 'default',
	schema: schema,
	logger: logger,
});

export function createDBConnection(conn: mysql.Pool) {
	return drizzle(conn, {
		mode: 'default',
		schema: schema,
		logger: logger,
	});
}
