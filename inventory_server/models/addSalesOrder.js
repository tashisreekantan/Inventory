const mongoose = require("mongoose");

const salesOrderSchema = new mongoose.Schema({
        customer_name : String,
        item : String,
        number_of_item : String,
        price : String,
        phone : Number,
});

const salesOrderModel = mongoose.model("Sales Order",salesOrderSchema)

module.exports = salesOrderModel;