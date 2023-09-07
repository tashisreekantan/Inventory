const express = require("express")
const { addItem } = require("../controller/inventoryController")

const router = express()

router.post("/addItem",addItem)

module.exports = router;