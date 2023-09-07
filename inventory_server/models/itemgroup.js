const mongoose = require("mongoose");

const itemGroupSchema = new mongoose.Schema({
  groupname: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  createdOn: { type: Date, default: Date.now },
});

const ItemGroupModel = mongoose.model("ItemGroup", itemGroupSchema);

module.exports = ItemGroupModel;
