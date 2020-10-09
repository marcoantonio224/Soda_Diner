const express = require('express');
const router = express.Router();
const path = require("path");

// Grab our Soda controllers 
// const SodaController = require('../controllers/soda_controllers');
// Grab our Diner controllers
// const DinerController = require('../controllers/diner_controllers');

// Home page
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
});

// // Soda Routes
// router.get(`/sodas`, SodaController.getSodas);
// router.get(`/sodas/new`, (req, res) => res.render('sodaForm') );
// router.get(`/sodas/new/:sodaId`, SodaController.getSoda);
// router.post(`/sodas/new`, SodaController.create);

// // Diner Routes
// router.get("/diners", (req, res) => res.render('diners') );
// router.get("/diners/new", (req, res) => res.render('newDiner') );
// router.post('/diners/new', DinerController.create)

module.exports = router;
