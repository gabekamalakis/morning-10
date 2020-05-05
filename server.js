// Importing required libraries
//const express = require("express");
import express from "express";
//const fetch = require("node-fetch");
import fetch from "node-fetch";

// Importing SQLite
import sqlite3 from "sqlite3";

const dbSettings = {
	filename: './tmp/litterdata.db',
	driver: sqlite3.Database
};



const app = express();
// Port selection
const port = process.env.PORT || 3000;

// Wiring up server to use Public folder
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
};
