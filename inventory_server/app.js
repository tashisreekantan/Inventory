const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { itemModel } = require("./models/item");
const ItemGroupModel = require("./models/itemgroup");
const customerModel = require("./models/customer");
const salesOrderModel = require("./models/addSalesOrder");
const InventoryAdjustment = require("./models/inventoryAdjustments");
const vendorModel = require("./models/vendor");
const packageModel = require("./models/packages");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

mongoose.connect(
  "mongodb+srv://tashisreekantand:tashi8563@cluster0.6ulfxv7.mongodb.net/inventoryDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//----------Routes---------------
app.use("/inventory", require("./routes/inventory"));

// ---------------------INVENTORY----------------------------

// app.post("/addItem", async (req, res) => {
//   const { name,
//     unit,
//     dimensions,
//     weight,
//     manufacturer,
//     brand,
//     sellingPrice,
//     costPrice,
//     description,
//     openingStock,
//     reorder,
//     preferredVendor,
//     groupId } = req.body;
//   let group = await ItemGroupModel.findById(groupId);
//   const groupName = group.groupname;
//   const newItem = new itemModel({
//     name: name,
//     unit: unit,
//     dimensions: dimensions,
//     weight: weight,
//     manufacturer: manufacturer,
//     brand: brand,
//     sellingPrice: sellingPrice,
//     costPrice: costPrice,
//     description: description,
//     openingStock: openingStock,
//     reorder: reorder,
//     preferredVendor: preferredVendor,
//     groupName: groupName,
//   });
//   const data = new itemModel(newItem);
//   await data.save();
//   group.items.push(data._id);
//   const result = await group.save();
//   if (result) {
//     console.log(result);
//     res.json({ msg: "New Item Added Successfully" });
//   }
// });

app.get("/getItems", async (req, res) => {
  let data = await itemModel.find();
  res.json({ itemList: data });
});
app.post("/deleteItem", async (req, res) => {
  try {
    const itemId = req.body.itemId;
    let data = await itemModel.findByIdAndDelete(itemId);
    if (data) {
      res.json({ msg: "200" });
    } else {
      res.json({ msg: "deletion failed" });
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.post("/editItem", async (req, res) => {
  try {
    let data = await itemModel.findByIdAndUpdate(
      { _id: req.body._id },
      req.body
    );
    console.log(data);
    if (data) {
      res.json({ msg: "200" });
    } else {
      res.json({ msg: "Update Failed" });
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.post("/addGroup", async (req, res) => {
  let data = new ItemGroupModel(req.body);
  data.save(res.json({ msg: "New Group Added Successfully" }));
});

app.get("/getGroup", async (req, res) => {
  let result = await ItemGroupModel.find();
  // console.log(result);
  res.json({ groupList: result });
});

// To create a new inventory adjustment
app.post("/addInventoryAdjustments", async (req, res) => {
  try {
    const {
      itemId,
      modeOfAdjustment,
      sellingPrice,
      quantity,
      reason,
      description,
      uploadFile,
    } = req.body;

    const newAdjustment = new InventoryAdjustment({
      itemId,
      modeOfAdjustment,
      sellingPrice,
      quantity,
      reason,
      description,
      uploadFile,
    });
    const savedAdjustment = await newAdjustment.save();
    if (savedAdjustment) {
      var Item = await itemModel.findById({ _id: itemId });
      Item.sellingPrice = sellingPrice;
      Item.openingStock = quantity;
      let editedItem = await itemModel.findByIdAndUpdate({ _id: itemId }, Item);
      if (editedItem) {
        res.status(201).json({ res: "New adjustment added successfully" });
      }
    } else {
      res.status(201).json({ res: "New adjustment added failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// To get all inventory adjustments
app.get("/inventoryAdjustments", async (req, res) => {
  try {
    const adjustments = await InventoryAdjustment.find();
    res.json(adjustments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//To get inventory adjustments based on date/period selection
app.get("/inventoryAdjustments/report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const adjustments = await InventoryAdjustment.find({
      date: { $gte: startDate, $lte: endDate },
    });

    res.json(adjustments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//-----------------------INVENTORY ENDS HERE-------------------

//-----------------------SALES  STARTS  HERE-------------------

app.post("/addCustomer", async (req, res) => {
  let data = new customerModel(req.body);
  data.save(res.json({ msg: "New Customer Added Successfully" }));
  console.log(data);
});

app.post("/getCustomers", async (req, res) => {
  let data = await customerModel.find()
  res.json({ itemList: data });
});
app.post("/addSalesOrders", async (req, res) => {
  let salesOrder = new salesOrderModel(req.body);
  data.save(res.json({ msg: "Sales Order Added" }));
  console.log(salesOrder);
});
app.post("/editCustomer",async(req,res)=>{
  try {
    let data = await customerModel.findByIdAndUpdate(
      {_id:req.body._id},req.body
    );
  console.log(data);
  if (data) {
    res.json({msg:"200"}) 
  } else {
    res.json({msg:"update failed"})
  }
  } catch (error) {
    console.log(error.msg);
  }
})

app.post("/addPackage", async (req, res) => {
  let data = new packageModel(req.body);
  data.save(res.json({ msg: "New Package Added Successfully" }));
  console.log(data);
});
//--------------------------SALES ENDS HERE-----------------------

// ----------------------------PURCHASE STARTS HERE------------------

app.post("/addVendor", async (req, res) => {
  let data = new vendorModel(req.body);
  data.save(res.json({ msg: "New Vendor Added Successfully" }));
  console.log(data);
});

app.post("/getVendors", async (req, res) => {
  let data = await vendorModel.find()
  res.json({ itemList: data });
});

app.post("/editVendors",async(req,res)=>{
  try {
    let data = await vendorModel.findByIdAndUpdate(
      {_id:req.body._id},req.body
    );
  console.log(data);
  if (data) {
    res.json({msg:"200"}) 
  } else {
    res.json({msg:"update failed"})
  }
  } catch (error) {
    console.log(error.msg);
  }
})

// ----------------------------PURCHASE ENDS HERE------------------


app.listen(5000, () => {
  console.log("Server running in 5000");
});
