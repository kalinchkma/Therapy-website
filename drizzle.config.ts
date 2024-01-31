/** @format */

import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
console.log('URL', process.env.DB_URL);

export default {
	schema: './src/db/schema/*',
	driver: 'mysql2',
	out: './drizzle',
	dbCredentials: {
		uri: process.env.DB_URL!,
	},
} satisfies Config;
