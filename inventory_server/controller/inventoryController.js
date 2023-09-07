const { cloudinary } = require("../config/cloudinary");
const { itemModel } = require("../models/item");
const ItemGroupModel = require("../models/itemgroup");

module.exports.addItem = async (req, res) => {
  const {
    name,
    unit,
    dimensions,
    weight,
    manufacturer,
    brand,
    sellingPrice,
    costPrice,
    description,
    openingStock,
    reorder,
    preferredVendor,
    groupId,
    encodedUrl,
  } = req.body;
  let group = await ItemGroupModel.findById(groupId);
  const groupName = group.groupname;
  const cloudinaryRes = await cloudinary.uploader.upload(encodedUrl);
  if (cloudinaryRes.secure_url) {
    const newItem = new itemModel({
      name: name,
      unit: unit,
      dimensions: dimensions,
      weight: weight,
      manufacturer: manufacturer,
      brand: brand,
      sellingPrice: sellingPrice,
      costPrice: costPrice,
      description: description,
      openingStock: openingStock,
      reorder: reorder,
      preferredVendor: preferredVendor,
      groupName: groupName,
      image: cloudinaryRes.secure_url,
    });
    const data = new itemModel(newItem);
    await data.save();
    group.items.push(data._id);
    const result = await group.save();
    if (result) {
      res.json({ msg: "New Item Added Successfully" });
    }
  }
};
