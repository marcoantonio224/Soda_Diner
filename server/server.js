const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database/database');
const routes = require('./routes/routes');
const path = require('path');

const app = express();

// Use client folder to render all pages from client side
app.use(express.static(path.join(__dirname, '../client')));
// change extended option to true it will refrain from turning it to a json
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
// Declare our routes from routes.js file
app.use('/', routes);
// Set the Port of our Application
const PORT = process.env.PORT || 3000
// Launch app to PORT 
app.listen(PORT,()=>{
    console.log(`Server is up on ${PORT}`);
});
