const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
        name:{ type: String},
        phone:{type : String},
        email:{type : String},
       
});

const customerModel = mongoose.model("Customer",customerSchema);

module.exports = customerModel;   