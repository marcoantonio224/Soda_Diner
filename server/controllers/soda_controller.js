//Call Soda model
const Soda = require('../models/Soda');
const path = require('path');

module.exports = {
    // Create a new soda
    create(req, res, next) {
        // Parse the request body from client
        const sodaProps = req.body;
        console.log(sodaProps)
        // Create the soda
        Soda.create(sodaProps)
            // Return the new soda id to client response
            .then(soda => res.json({ soda: soda }))
            // Catch error if fails and go to next request
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
        },
    // Get all sodas
    getSodas(req, res, next) {
        // Get all sodas
        Soda.find({})
            // Pass the sodas back to client
            .then(sodas => res.json({ sodas: sodas }))
            // Catch error if fails and go to next request
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
        },
    // Get the details of a soda
    getSoda(req, res, next) {
        // Grab the soda by the id parameter from url browser
        const { id } = req.params;
        // Find soda by Id
        Soda.findById({ _id: id })
            .then(soda => {
                const sodaObj = {
                    _id: soda._id,
                    name: soda.name,
                    brand: soda.brand
                }
                res.json({ soda: sodaObj })
        })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    // Delete Soda
    delete(req, res, next) {
        // Grab the soda by the sodaId parameter from url browser
        const { id } = req.params;
        // Find soda by Id
        Soda.findOneAndDelete({ _id: id })
            .then(soda => {
                res.json({ soda: soda._id })
        })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    }
}