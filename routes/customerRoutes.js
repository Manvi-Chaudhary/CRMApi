const express = require("express");
const router = express.Router();
const controller = require("../controllers/customerController")

router.route("/").get(controller.getAllCustomers).post(controller.addCustomer);

router.route("/:id").get(controller.getCustomerByID).put(controller.updateCustomer).delete(controller.deleteCustomer);

module.exports = router