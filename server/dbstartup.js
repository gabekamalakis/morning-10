// Modules
import fetch from "node-fetch";
import { open } from "sqlite";

const { createTables } = require("./sqlCommands");


async function initializeDatabase(dbSettings) {
	const baseURL = "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";
	const response = await fetch(baseURL);
	let dbstatus = "";
	try {
		const data = await response.json()
		await databaseLoader(dbSettings, data);
		dbstatus = "success";

	} catch(e) {
		console.log("Database Failure");
		dbstatus = "failure";

	}

	return dbstatus
}

async function databaseLoader(dbSettings, data) {
	(async () => {
		try {
			const db = await open(dbSettings);
			await createTables(dbSettings, data);
		}
		catch(e) {
			console.log("Error Loading Database");
		};
	})();
};

// Database loading function

async function locationFetcher(Settings) {
	const db = await open(Settings);
	const query = await db.all("Select latitude, longitude, numBags from user");
	return query;
};

module.exports = {
	initializeDatabase,
	locationFetcher
}
