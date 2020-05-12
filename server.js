// Required Modules
import express from "express";
import fetch from "node-fetch";

const bodyParser = require("body-parser");
const { createTables, addPickup } = require("./server/sqlCommands");

// Importing SQLite
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbSettings = {
	filename: './tmp/database.db',
	driver: sqlite3.Database,
};

// SERVER STARTUP AND DATA LOADING
initializeDatabase();

/// APPLICATION
// Express settings
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(bodyParser.json());

// Load node_modules from here https://stackoverflow.com/a/27464258
app.use('/scripts', express.static(__dirname + '/node_modules/'));


app.listen(port, () =>
  console.log(`LitterLogger server listening on port ${port}!`)
);

// App Endpoints
app.route("/api")
	.get(async (req, res) => {
  		processDataForFrontEnd(req, res);
	})
	.put(async (req, res) => {
		console.log("Form Submitting...");
		await processForms(req, res);
});

// Data Fetching function (Async-Await for much better readability and less headbanging)
async function processDataForFrontEnd(req, res) {
	try {
		// Fetch from Database
		const dataPoints = await locationFetcher(dbSettings);

		await res.send({ dataPoints })
		}
	catch(e) {
		console.log('error fetching from database');
		res.redirect("/error")
	};
};

// Loading Form data to database function
async function processForms(req, res) {
	console.log("Form Appearance", req.body);

	if (!req.body) {
		console.log(req.body);
		res.status("400").json("Please do not leave any fields blank");
	}
	else {
		try {
			const result = await addPickup(dbSettings, req.body);
			console.log("Status: ", result);
			res.json("Request received");
		}
		catch(e) {
			console.log("Error submitting data");
		};
	}
};

// Database loading function
async function initializeDatabase() {
	const baseURL = "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";
	const response = await fetch(baseURL);
	let dbstatus = "";
	try {
		const data = await response.json()
		await databaseLoader(data);
		dbstatus = "success";

	} catch(e) {
		console.log("Database Failure");
		dbstatus = "failure";

	}

	return dbstatus
}

async function databaseLoader(data) {
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

async function locationFetcher(Settings) {
	const db = await open(Settings);
	const query = await db.all("Select latitude, longitude, numBags from user");
	return query;
};
