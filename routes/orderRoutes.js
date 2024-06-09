const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController")

router.route("/").get(controller.getAllOrders).post(controller.addOrder);

router.route("/:id").get(controller.getOrderByID)

module.exports = router