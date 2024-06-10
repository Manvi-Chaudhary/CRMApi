const express = require("express");
const router = express.Router();
const controller = require("./vendorController")

router.route("/").get(controller.getAllVendors).post(controller.messageReceived);


module.exports = router