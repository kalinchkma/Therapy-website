/** @format */

import { config, createDBConnection } from '@/db';
import { packages } from '@/db/schema/packages';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

// get all packages
export async function getPackages() {
	try {
		// connection database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);

		const allPackages = await db.select().from(packages);

		// close database connection
		conn.end();
		return allPackages;
	} catch (error) {
		return [];
	}
}

// get package by id
export async function getPackageById(id: number) {
	try {
		// connect database
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		const p = await db.select().from(packages).where(eq(packages.id, id));
		// close connection
		conn.end();
		return p[0];
	} catch (error) {
		redirect('/errors');
	}
}
