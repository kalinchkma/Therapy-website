/** @format */

import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from './';

(async function migrations() {
	try {
		console.log('migratting...');
		// This will run migrations on the database, skipping the ones already applied
		await migrate(await db, { migrationsFolder: './drizzle' });
		// Don't forget to close the connection, otherwise the script will hang
		await connection.end();
		console.log('Closing connection');
		process.exit(0);
	} catch (e) {
		console.log(e);
	}
})();
