import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function createTables(dbSettings) {
	console.log('Initializing Database');

	const db = await open(dbSettings);
	await db.exec('CREATE TABLE IF NOT EXISTS user (name, email, phoneNumber)');
	await db.exec('CREATE TABLE IF NOT EXISTS trash (numBags)');


	// This is a check to see if it's working
	const result  = await db.each('SHOW TABLES;', (err) => {
		console.log('createTables', err);
	});

	return result;
}

export default createTables;