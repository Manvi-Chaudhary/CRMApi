const asyncHandler = require("express-async-handler");
const campaign = require("../models/campaignModel")

//@desc get all campaigns
//@route GET /api/campaign
//@access public
const getAllCampaigns = ( async (req,res)=>{
    const result = await campaign.find().sort({ "createdAt": -1 });
    res.status(200).json(result);
})

//@desc add a campaign
//@route POST /api/campaign
//@access public
const addCampaign = ( async (req,res)=>{
    const { audience } = req.body ;
    console.log(audience)
    const res1 = await campaign.create({
        audience
    })
    res.status(201).json(res1);
})

module.exports = { getAllCampaigns , addCampaign }
