// Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Soda Schema
const Soda = new Schema(
    {
        name: { type: String, required:true },
        brand: { type: String, required: true },
        fizziness: { type: Number, required:true },
        taste_rating: { type: Number, required: true },
        is_serving: { type: Boolean, default: false }
        
    }
);

// Before we remove the soda, perform a cascade of deletion from other models
Soda.pre('remove', (cb)=>{
    // Remove all the sodas that are 'referred' in Diners model
    this.model("Diners").remove({ Soda_Id: this._id }, cb);
});

// Export the schema
module.exports = mongoose.model("soda", Soda);