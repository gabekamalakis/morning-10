// Importing required libraries
//const express = require("express");
import express from "express";
//const fetch = require("node-fetch");
import fetch from "node-fetch"
const application = express();

// Port selection
const port = process.env.PORT || 3000;

// JSON data Features

// Wiring up server to use Public folder
application.use(express.static("public"));

application.listen(port, () =>
  console.log(`LitterLogger listening on port ${port}!`)
);

application.get("/api", (req, res) => {
  processDataForFrontEnd(req, res);
});

function processDataForFrontEnd(req, res) {
  const baseURL =
    "https://data.princegeorgescountymd.gov/resource/9tsa-iner.json";

  //Fetch API Call
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      console.log("LitterTrak data", data);
      const dataPoints = [];
      // for (key in data) {
      //   dataPoints.push({
      //     lat: data[key].geocoded_column[key].longitude,
      //     lng: data[key].geocoded_column[].latitude,
      //     total_bags: data[key].total_bags_litter,
      //   });
      // }
      for (let i=0; i<data.length; i++) {
        dataPoints.push({
          lat: data[i].geocoded_column.longitude,
          lng: data[i].geocoded_column.latitude,
          total_bags: data[i].total_bags_litter,
        });
      }
      console.log("Filter to lat, long, and total bags", dataPoints);

      res.send({ dataPoints }); // Return data to front end
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/error");
    });
}
