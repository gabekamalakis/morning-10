// import sqlite3 from 'sqlite3';
import  { open } from 'sqlite';

async function createTables(dbSettings, data) {
	console.log('Initializing Database...');
	let result = "";
	try {

		const db = await open(dbSettings);
		// Clears out previous entries (only for database loads)
		console.log('Dropping existing databases...');
		await db.exec('DROP TABLE IF EXISTS user');
		console.log('Database cleared.');
		await db.exec('CREATE TABLE IF NOT EXISTS user (name, email, phoneNumber, orgoption, organization, datatime, cleanuptype, trashType, weight, numBags, notes, longitude, latitude)');

		result = "Success";
		console.log("Database Initialized");
	}
	catch(e) {
		result = "Failure";
		console.log("Error Initializing Database");
		// return result;
	}
	if (result == "Success") {
		console.log("Attempting to load data...");
		try {
		const db = await open(dbSettings);
		data.forEach((item) => {
			const itemorganization = item.organization;
			const itemtrashType = item.type_litter;
			const itemnumBags = item.total_bags_litter;
			const itemlongitude = item.geocoded_column.longitude;
			const itemlatitude = item.geocoded_column.latitude;
			db.exec(`INSERT INTO user (organization, trashType, weight, numBags, longitude, latitude) VALUES ("${itemorganization}", "${itemtrashType}", "${itemnumBags}", "${itemlongitude}", "${itemlatitude}")`);

        	});
			console.log('Data loaded succesfully');

		}
		catch(e) {
			console.log("Loading data broke somehow");
		}
	}

	return result;

}

async function addPickup(dbSettings, name, email, phoneNumber, trashType, weight, numBags, longitude, latitude) {
	console.log("Inserting Form data...");
	const db = open(dbSettings);
	await db.exec(`INSERT INTO user (name, email, phoneNumber, trashType, weight, numBags, longitude, latitude) VALUES (${name}, ${email}, ${phoneNumber}, ${trashType}, ${weight}, ${numBags}, ${longitude}, ${latitude})`);
	console.log("Success");
}

module.exports = {
	createTables,
	addPickup
}
