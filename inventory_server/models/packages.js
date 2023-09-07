const mongoose = require("mongoose")

const packageSchema = new mongoose.Schema({
    itemName:{ type: String},
    Quantity:{ type: Number},
    Weight:{ type: Number},
    Receiver:{ type: String},
    Location:{ type: String},
    dateOfDelivery:{type:String}  
})

const packageModel = mongoose.model("Package",packageSchema)

module.exports = packageModel; 