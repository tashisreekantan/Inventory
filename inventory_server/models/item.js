const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String },
  dimensions: { type: String },
  weight: { type: String },
  manufacturer: { type: String },
  brand: { type: String },
  sellingPrice: { type: Number }, 
  costPrice: { type: Number },  
  description: { type: String },
  openingStock: { type: Number },
  reorder: { type: Number },
  preferredVendor: { type: String },
  image: { type: String },
  groupName: {type: String }, 
  image: {type: String }, 
  createdOn: { type: Date, default: Date.now }
});
 
const itemModel = mongoose.model("Item", itemSchema);  
 
module.exports = { itemModel }; 
 