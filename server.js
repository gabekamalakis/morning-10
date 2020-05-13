// Required Modules
import express from "express";
import fetch from "node-fetch";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const bodyParser = require("body-parser");
const { addPickup }  = require("./server/sqlCommands");
const { initializeDatabase, locationFetcher } = require("./server/dbstartup");


// SQLite Settings

const dbSettings = {
	filename: './tmp/database.db',
	driver: sqlite3.Database,
};

// SERVER STARTUP AND DATA LOADING
initializeDatabase(dbSettings);

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

// App Routing (Endpoints)
app.route("/api")
	.get(async (req, res) => {
  		processDataForMap(req, res);
	})
	.put(async (req, res) => {
		await processForms(req, res);
});

// Data Fetching function
async function processDataForMap(req, res) {
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
	console.log(req.body);

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
			console.log("Status: ", result);
			res.redirect("/error");
		};
	}
};
