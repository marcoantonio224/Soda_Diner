const express = require('express');
const router = express.Router();
const path = require("path");

// Grab Soda model & controllers 
const Soda = require('../models/Soda');
const SodaController = require('../controllers/soda_controller');

// Grab Diner modal & controllers
const Diner = require('../models/Diner');
const DinerController = require('../controllers/diner_controller');

/*                   Home Page                      */

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

/*                   Soda Page                      */
// Get All Sodas
router.get('/sodas', SodaController.getSodas);
// Get only sodas that are being server
router.get('/sodas/serving', SodaController.getServingSodas);
// Update server 
router.put('/soda/updateSoda/:id', SodaController.serving_soda);
// Get Soda Details
router.get('/soda/:id', SodaController.getSoda);
// Create a soda
router.post('/sodas', SodaController.create);
// Delete a Soda
router.delete('/soda/:id', SodaController.delete);

/*                   Diner Page                      */
// Get All Diners
router.get('/diners', DinerController.getDiners);
// Get Diner Details
router.get('/diner/:id', DinerController.getDiner);
// Get the sodas for diner
router.get('/diner/sodas/info', DinerController.getSodas);
// Create a diner
router.post('/diner', DinerController.create);
// Delete a Diner
router.delete('/diner/:id', DinerController.delete);

// Export router
module.exports = router;
