const express = require("express");
const router = express.Router();
const controller = require("../controllers/campaignController")

router.route("/").get(controller.getAllCampaigns).post(controller.addCampaign);

module.exports = router