//Call Soda model
const Diner = require('../models/Diner');
const Soda = require('../models/Soda');
const path = require('path');

module.exports = {
    // Create a new soda
    create(req, res, next) {
        // Parse the request body from client
        const dinerProps = req.body; 
        console.log(dinerProps)       
        // Save the diner
        Diner.create(dinerProps)
            // Return the new soda id to client response
            .then(diner => res.status(200).json({ diner: diner }))
            // Catch error if fails and go to next request
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}));            
    },
    // Get all sodas
    getDiners(req, res, next) {
        // Get all sodas
        Diner.find({})
            // Pass the sodas back to client
            .then(diners => res.status(200).json({ diners: diners }))
            // Catch error if fails and go to next request
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    // Get the details of a soda
    getDiner(req, res, next) {
        // Grab the soda by the sodaId parameter from url browser
        const { id } = req.params;
        // Find soda by Id
        Diner.findById({ _id: id })
            .then(diner => {
                const dinerObj = {
                    _id: diner._id,
                    name: diner.name,
                    location: diner.location,
                    sodas: diner.sodas
                }
                res.status(200).json({ diner: dinerObj });
        })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    // Get sodas for diner's details
    getSodas(req, res, next) {
        // Get the array of sodas from header
        const sodasArr = req.headers.sodas.split(',');
        // Declare results array for sodas to be sent back to client
        let results = [];
        // Get all sodas
        Soda.find({})
            .then(sodas => {
                // Loop through all sodas to see which are present in diner
                sodas.map(soda => {
                    // Check to see if the soda is present in the array of diner sodas
                    // Check to see if that particular soda is being served as well
                    if(sodasArr.indexOf(soda._id.toString()) > -1 && soda.is_serving) {
                        // If true for both conditions, push soda to results array 
                        results.push(soda);
                    }
                });
                // Return successfull operation for sodas
                res.status(200).json({ sodas: results });
            })
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}));
    },

    // Update diner
    updateDiner(req, res, next) {
        const { id } = req.params;
        const { name, location } = req.body;
        // Update diner
        Diner.updateOne({ _id: id }, [ { $set : { name: name, location: location } } ], { multi: true })
        .then(soda=> res.status(200).json({message:"Diner updated successfully"}))
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    updateSodas(req, res, next) {
        // New sodas to update
        const { sodas } = req.body;
        // ID for diner
        const { id } = req.params;
        // Length of new sodas
        const amountOfSodas = sodas.length - 1;
        // Loop through the amount of sodas
        for(let i = 0; i < sodas.length; i++) {
            // Each soda in array
            const soda = sodas[i];
            console.log(soda,'SODaaa')
            // Update Diner for each soda
            Diner.updateOne({ _id: id }, { $push: {sodas: soda} },(err, diner) => {
                // Return update success when end of array
                if(i === amountOfSodas){
                    console.log(err)
                    if(err) return res.status(500).json({message:"Oops, something went wrong!", err: err});
                    return res.status(200).json({message:"Diner updated sodas successfully"});
                }
            })
        }
            
    },
    // Delete Soda
    delete(req, res, next) {
        // Grab the soda by the sodaId parameter from url browser
        const { id } = req.params;
        // Find soda by Id
        Diner.findOneAndDelete({ _id: id })
            .then(diner => {
                res.json({ diner: diner._id })
        })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    }
}