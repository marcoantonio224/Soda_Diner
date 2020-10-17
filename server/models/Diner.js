// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Diner Schema
const Diner = new Schema(
    {
        name: { type: String, required:true },
        location: { type: String, required: true },
        // Populate Sodas in this array
        sodas: [{ type: Schema.Types.ObjectId, ref:'Soda' }]
    }
);

// Export the schema
module.exports = mongoose.model("diner", Diner);