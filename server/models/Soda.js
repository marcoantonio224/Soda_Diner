// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Soda Schema
const Soda = new Schema(
    {
        name: {type: String, required:true},
        brand: {type: String, required: true},
        fizziness: {type: Number, required:true},
        taste_rating: {type: Number, required: true}
        
    }
);

// Export the schema
module.exports = mongoose.model("soda", Soda);