// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sodaSchema = require('./Soda.js');

// Define the Diner Schema
const Diner = new Schema(
    {
        name: {type: String, required:true},
        location: {type: String, required: true},
        sodas: [sodaSchema]
    }
);

// Export the schema
module.exports = mongoose.model("diner", Diner);