//Call Soda model
const Soda = require('../models/Soda');
const path = require('path');

module.exports = {
    // Create a new soda
    create(req, res, next) {
        // Parse the request body from client
        const sodaProps = req.body;
        // Create the soda
        Soda.create(sodaProps)
            // Return the new soda id to client response
            .then(soda => res.status(200).json({ soda: soda }))
            // Catch error if fails and go to next request
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
        },
    // Get all sodas
    getSodas(req, res, next) {
        // Get all sodas
        Soda.find({})
            // Pass the sodas back to client
            .then(sodas => res.status(200).json({ sodas: sodas }))
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
                    brand: soda.brand,
                    fizziness: soda.fizziness,
                    rating: soda.taste_rating,
                    served: soda.is_serving
                }
            // Send soda back to user
            res.status(200).json({ soda: sodaObj });
        })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    getServingSodas(req, res, next) {
        // Get all sodas
        Soda.find({is_serving:true})
            // Pass the sodas back to client
            .then(sodas => res.status(200).json({ sodas: sodas }))
            // Catch error if fails and go to next request
            .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    updateSoda(req, res, next) {
        const { id } = req.params;
        const {name, brand, fizziness, taste_rating} = req.body;
        // Update the soda 
        Soda.update({_id: id}, [
            { $set : { name: name, brand: brand, fizziness: fizziness, taste_rating: taste_rating } }
        ], { multi: true })
        .then(soda=> res.status(200).json({message:"Soda updated successfully"}))
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    serving_soda(req, res, next) {
        // Get soda id from parameter
        const { id } = req.params;
        // Get value for serving 
        const { serving } = req.body;
        // Update the soda according to boolean value
        Soda.updateOne({ _id: id }, {$set: { is_serving: serving }})
        .then(soda => res.json({message: "Updated soda", serving: serving }))
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
                res.status(200).json({ soda: soda._id })
        })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    }
}