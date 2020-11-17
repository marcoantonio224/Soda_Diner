//Call Soda model
const Diner = require('../models/Diner');
const Soda = require('../models/Soda');
const path = require('path');
const mongoose = require("mongoose");

module.exports = {
    // Create a new soda
    create(req, res, next) {
        // Parse the request body from client
        const dinerProps = req.body; 
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
        // Get the type for Object Id in mongoose
        const ObjectId = mongoose.Types.ObjectId;
        // Perform an aggregate in mongo to get all the sodas being served
        Diner.aggregate(
            [
                // We want to match the id for Diner
                {$match:{_id: ObjectId(id)}}, 
                // Look up the sodas based off of the foreign key
                {$lookup: { from:"sodas", localField:"sodas", foreignField:"_id", as:"results" } } 
            ])
            .then(dinerArr => {
                // Get diner
                const diner = dinerArr[0];
                const dinerObj = {
                    _id: diner._id,
                    name: diner.name,
                    location: diner.location,
                    // Filter out sodas not being served
                    sodas: diner.results.filter((soda,idx)=> soda.is_serving === true)
                }
                res.status(200).json({ diner: dinerObj });
            })
        // Catch error if fails and go to next request
        .catch(err => res.status(500).json({message:"Oops, something went wrong!", err: err}))
    },
    // Update diner
    updateDiner(req, res, next) {
        const { id } = req.params;
        const { name, location } = req.body;
        const sodas = req.body.sodas || [];
        const ObjectId = mongoose.Types.ObjectId;
        // Convert each soda id into mongoose object id
        let sodaObjectIds = sodas.map(id => ObjectId(id));
        // Update diner
        Diner.updateOne({ _id: id }, [ { $set : { name: name, location: location, sodas: sodaObjectIds } } ], { multi: true })
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