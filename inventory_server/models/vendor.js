const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
        name:{ type: String},
        phone:{type : String},
        email:{type : String},
        location:{type : String},
        createdOn: { type: Date, default: Date.now }
       
});

const vendorModel = mongoose.model("Vendor",vendorSchema);

module.exports = vendorModel;   