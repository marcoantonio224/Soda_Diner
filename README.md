# Thirsty Mongoose
## Description
Welcome to Thirsty Mongoose! Feeling thirsty? Craving a soda ? Feel free to explore 
Thirsty Mongoose to see if they are serving your favorite soda in your local diners! 
This application was designed to add, delete, and serve sodas inside a diner near you. 
The purpose of this project was to provide an exemplar of the requirements to the student 
under The Last Mile curriculum. It was designed with the following technologies: [HTML, CSS, JavaScript, Express, Node.js]

## Installation
In order to get this project up and running, please go into the server file and 
download all modules appropriately from package.json file. This can be accomplished
by the following commands via CLI: 
<br />
`cd server` & `npm i` 
<br />
The following commands will install the node modules to get this app up and running.

## Database
This application was configured with Mongodb with Mongoose Schema. To get the database
up and running type in the following via terminal:
`mongodb`
Once inside mongo, you can see the database via terminal: `use sodaDiner`
Then you can see the collections by typing: `show collections`


## Up and Running
Once your node modules are installed this application can get started, inside the server directory via the terminal type in: 
<br />
`npm start`
<br />
Your can go directly to your host (ThirstyMongoose)[http://localhost:3000]

## Frontend Experience

### Home Page
The default home page is `index.html`, which just welcomes the user to Thirsty Mongoose. 
Then there are links that will take you to view the listing for all sodas and diners.

### All Sodas
This page is a listing of all the sodas avaiable to diners. It gives you the option to 
view each soda's detail by clicking on the link (soda's name). This page also gives you the ability
to add a new soda where it will take you to `sodaForm.html`.

### Add a Soda
Inside `sodaForm.html`, the user is able to fill out the form and
create a new soda, which is saved into the database.

### Soda's Details
Inside `soda.html`, the user is able to see the full details of the soda - the `fizziness`,
`taste rating`, and see if it is being `served`. Also in this page the user can manually start serving the soda to diners or stop its serving. The user can also delete the soda on this page.

### All Diners
This page is a listing of all the diners. It gives you the option to 
view each diner's detail by clicking on the link (diner's name). This page also gives you the ability to add a new diner where it will take you to `dinerForm.html`.

### Add a Diner
Inside `sodaForm.html`, the user is able to fill out the form and
create a new soda, which is saved into the database. 

### Diner's Details
Inside `diner.html`, the user is able to see the full details of the diner. The user can also delete the diner on this page.


## Authors
The Last Mile 