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
		await db.exec('CREATE TABLE IF NOT EXISTS user (name, email, phoneNumber, organization, orgNumber, datetime, cleanuptype, litterType, weight, numBags, notes, longitude, latitude)');

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
			const itemlitterType = item.type_litter;
			const itemnumBags = item.total_bags_litter;
			const itemlongitude = item.geocoded_column.longitude;
			const itemlatitude = item.geocoded_column.latitude;
			db.exec(`INSERT INTO user (organization, litterType, numBags, longitude, latitude) VALUES ("${itemorganization}", "${itemlitterType}", "${itemnumBags}", "${itemlongitude}", "${itemlatitude}")`);

        	});
			console.log('Data loaded succesfully');

		}
		catch(e) {
			console.log("Loading data broke somehow");
		}
	}

	return result;

}

async function addPickup(dbSettings, jobject) {
	console.log("Inserting Form data...");

	const name = jobject.name;
	const email = jobject.email;
	const phoneNumber = jobject.phoneNumber;
	const organization = jobject.organization;
	const orgNumber = jobject.orgNumber;
	const datetime = jobject.datetime;
	const cleanuptype = jobject.cleanupType;
	const litterType = jobject.litterType;
	const weight = jobject.weight;
	const numBags = jobject.numBags
	const notes = jobject.notes;
	const longitude = jobject.longitude;
	const latitude = jobject.latitude;

	try {
		const db = await open(dbSettings);

		await db.exec(`INSERT INTO user (name, email, phoneNumber, organization, orgNumber, datetime, cleanupType, litterType, weight, numBags, notes, longitude, latitude) VALUES ("${name}", "${email}", "${phoneNumber}", "${organization}", "${orgNumber}", "${datetime}", "${cleanuptype}", "${litterType}", "${weight}", "${numBags}", "${notes}", "${longitude}", "${latitude}")`);
		const test = await db.get(`SELECT * from user where name = "${name}"`);
		console.log(test);
		return "Success"

	} catch(e) {
		console.log("Database Error on insert");
		return "Failure";
	}
}



module.exports = {
	createTables,
	addPickup
}
