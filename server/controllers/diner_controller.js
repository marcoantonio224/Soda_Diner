//Call Soda model
const Diner = require('../models/Diner');
const Soda = require('../models/Soda');
const path = require('path');

module.exports = {
    // Create a new soda
    create(req, res, next) {
        // Parse the request body from client
        const dinerProps = req.body;
        // Save the diner
        Diner.create(dinerProps)
            // Return the new soda id to client response
            .then(diner => res.json({ diner: diner }))
            // Catch error if fails and go to next request
            .catch(err => res.json({message:"Oops, something went wrong!", err: err}));            
    },
    // Get all sodas
    getDiners(req, res, next) {
        // Get all sodas
        Diner.find({})
            // Pass the sodas back to client
            .then(diners => res.json({ diners: diners }))
            // Catch error if fails and go to next request
            .catch(err => res.json({message:"Oops, something went wrong!", err: err}))
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
                res.json({ diner: dinerObj });
        })
        // Catch error if fails and go to next request
        .catch(err => next(err))
    },
    // Get sodas for diner's details
    getSodas(req, res, next) {
        // Get the array of sodas from header
        const sodasArr = req.headers.sodas.split(',');
        // Declare results array for sodas to be sent back to client
        let results = [];
        // Loop for each soda
        for(let  i = 0; i < sodasArr.length; i++) {
            Soda.find({})
                .then(sodas => {
                    // Filter out any soda that's not in the array
                    // Convert the value of the object from soda to a string and compare
                    sodas.map(soda => (soda._id.toString() === sodasArr[i]) ? results.push(soda): '');
                    // Detect if the iteration has ended and return sodas to client
                    if(i === sodasArr.length - 1) return res.json({ sodas: results });
                })
                .catch(err => console.log(err));
        }
    },
    // Update diner
    updateDiner(req, res, next) {
        const { id } = req.params;
        const { name, location } = req.body;
        // Update diner
        Diner.update({_id: id}, [ { $set : { name: name, location: location } } ], { multi: true })
        .then(soda=> res.status(200).json({message:"Diner updated successfully"}))
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
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
        .catch(err => next(err))
    }
}