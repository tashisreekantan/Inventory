const mongoose = require('mongoose');

const inventoryAdjustmentSchema = new mongoose.Schema({
  itemId:  { type: mongoose.Schema.Types.ObjectId},
  modeOfAdjustment: { type: String, required: true },
  sellingPrice: {type: String},
  quantity: {type: String},
  date: { type: Date, default: Date.now },
  reason: { type: String, required: true },
  description: { type: String },
  uploadFile: { type: String }
});

const InventoryAdjustment = mongoose.model('InventoryAdjustment', inventoryAdjustmentSchema);

module.exports = InventoryAdjustment;
 