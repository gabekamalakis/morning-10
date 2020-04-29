// Importing required libraries
const express = require('express');
const application = express();


// Port selection
const port = process.env.PORT || 3000;

// JSON data Features

// Wiring up server to use Public folder
application.use(express.static('public'));


application.listen(port, () => console.log(`LitterLogger listening on port ${port}!`));
