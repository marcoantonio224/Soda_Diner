const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database/database');
const routes = require('./routes/routes');
// const controllers = require('./controllers/soda_controllers');
const path = require('path');

const app = express();

// Use client folder to render for client side
app.use(express.static(path.join(__dirname, '../client')));
// Declare urlencoded for json objects
app.use(express.urlencoded({extended:false}));
// Declare our routes from routes.js file
app.use(routes);
// Set the Port of our Application
const PORT = process.env.PORT || 3000

// Launch app to PORT 
app.listen(PORT,()=>{
    console.log(`Server is up on ${PORT}`);
});
