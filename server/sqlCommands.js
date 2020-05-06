// import sqlite3 from 'sqlite3';
import  { open } from 'sqlite';

async function createTables(dbSettings) {
	console.log('Initializing Database');

	const db = await open(dbSettings);
	await db.exec('CREATE TABLE IF NOT EXISTS user (name, email, phoneNumber, trashType, weight, numBags, locations)');

	// This is a check to see if it's working
	// const result  = await db.each('SHOW TABLES;', (err) => {
	// 	console.log('createTables', err);
	// 	});
	const result = "Success";

	return result;
}

async function addPickup(dbSettings, name, email, phoneNumber, trashType, weight, numBags) {

	const db = await open(dbSettings);
	await db.exec(`INSERT INTO user VALUES ("$name", "$email", "$phoneNumber", "$trashType", "$weight", "$numBags")`)

}

export default createTables;
