// import sqlite3 from 'sqlite3';
import  { open } from 'sqlite';

async function createTables(dbSettings, data) {
	console.log('Initializing Database...');
	let result = "";
	try {

		const db = await open(dbSettings);
		// Clears out previous entries (only for database loads)
		await db.exec('DROP TABLE IF EXISTS user');
		await db.exec('CREATE TABLE IF NOT EXISTS user (name, email, phoneNumber, organization, trashType, weight, numBags, longitude, latitude)');

		// This is a check to see if it's working
		// const result  = await db.each('SHOW TABLES;', (err) => {
		// 	console.log('createTables', err);
		// 	});
		result = "Success";
		console.log("Database Initialized");
		// return result;
	}
	catch(e) {
		result = "Failure";
		console.log("Error Initializing Database");
		// return result;
	}
	if (result == "Success") {
		try {
		const db = await open(dbSettings);
		data.forEach((item) => {
			const itemname = "null";
			const itememail = "null";
			const itemphoneNumber = "null";
			const itemorganization = item.organization;
			const itemtrashType = item.type_litter;
			const itemweight = "null";
			const itemnumBags = item.number_bags;
			const itemlongitude = item.geocoded_column.longitude;
			const itemlatitude = item.geocoded_column.latitude;
			db.exec(`INSERT INTO user (name, email, phoneNumber, organization, trashType, weight, numBags, longitude, latitude) VALUES ("${itemname}", "${itememail}", "${itemphoneNumber}", "${itemorganization}", "${itemtrashType}", "${itemweight}", "${itemnumBags}", "${itemlongitude}", "${itemlatitude}")`);

        	});
			console.log('data input worked');

		}
		catch(e) {
			console.log("Loading data broke somehow");
		}
	}

	return null

}

async function addPickup(dbSettings, name, email, phoneNumber, trashType, weight, numBags, longitude, latitude) {
	const db = open(dbSettings);
	await db.exec(`INSERT INTO user (name, email, phoneNumber, trashType, weight, numBags, longitude, latitude) VALUES (${name}, ${email}, ${phoneNumber}, ${trashType}, ${weight}, ${numBags}, ${longitude}, ${latitude})`)

}

module.exports = {
	createTables,
	addPickup
}
