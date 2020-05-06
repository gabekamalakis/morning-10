// Importing required libraries
//const express = require("express");
import express from "express";
//const fetch = require("node-fetch");
import fetch from "node-fetch";

import createTables from "./server/sqlCommands";

// Importing SQLite
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Error checking
sqlite3.verbose();

const dbSettings = {
	filename: './tmp/database.db',
	driver: sqlite3.Database,
};


// Express settings
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));

// Load node_modules from here https://stackoverflow.com/a/27464258
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.listen(port, () =>
  console.log(`LitterLogger server listening on port ${port}!`)
);

// JSON data Features
app.get("/api", (req, res) => {
  processDataForFrontEnd(req, res);
});

// Data Fetching function (Async-Await for much better readability and less headbanging)
async function processDataForFrontEnd(req, res) {
	const baseURL = "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";

	const response = await fetch(baseURL);
	try {
		const data = await response.json()

		const dataPoints = [];
		data.forEach((location) => {
			dataPoints.push({
        	  		lat: location.geocoded_column.longitude,
        	  		lng: location.geocoded_column.latitude,
        	  		total_bags: location.total_bags_litter,
			})
        	});
		res.send({ dataPoints })
		}
	catch(e) {
		console.log(err);
		res.redirect("/error")
	};

	databaseLoader();
};

// Database loading function

function databaseLoader() {
	(async () => {
		try {
			const db = await open(dbSettings);
			createTables(dbSettings);
			const testQuery = await db.all('PRAGMA table_info(user);');
			console.log("Test", testQuery);
		}
		catch(e) {
			console.log("You dun goofed");
			// console.log(err);
		};

	})();
}
