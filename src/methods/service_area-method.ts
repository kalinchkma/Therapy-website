/** @format */

import { config, createDBConnection } from '@/db';

import { service_area } from '@/db/schema/service_areas';
import { eq } from 'drizzle-orm';
import mysql from 'mysql2/promise';
import { redirect } from 'next/navigation';

export async function getAllServiceArea() {
	try {
		// create database connection
		const conn = mysql.createPool(config);
		const db = createDBConnection(conn);
		const all_service_area = await db.select().from(service_area);
		// close database connection
		conn.end();
		return all_service_area;
	} catch (error) {
		return [];
	}
}
