//Call Soda model
const Diner = require('../models/Diner');
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
                    brand: diner.brand
                }
                res.json({ diner: dinerObj })
        })
        // Catch error if fails and go to next request
        .catch(err => next(err))
    },
    // Delete Soda
    delete(req, res, next) {
        // Grab the soda by the sodaId parameter from url browser
        const { id } = req.params;
        // Find soda by Id
        Soda.findOneAndDelete({ _id: id })
            .then(diner => {
                res.json({ diner: diner._id })
        })
        // Catch error if fails and go to next request
        .catch(err => next(err))
    }
}