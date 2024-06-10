const asyncHandler = require("express-async-handler");
const campaign = require("../models/campaignModel")
const Customer = require("../models/customerModel")
const axios = require("axios")

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

const sendMessageToAllVendors = (async (req,res)=>{
    const { communicationLogId , message } = req.body ;
    const communicationLog = await campaign.findById(communicationLogId);
    const customers = await Customer.find({ _id: { $in: communicationLog.audience } })


    customers.forEach(sendMessage);
    
    
    //console.log(response.data)
    res.status(201).json({
        message : `message sent successfully to all the vendors in communication_log with id : ${communicationLogId}` 
    })
})

const sendMessage = ( async (val,ind,arr) => {
    const apiEndpoint = 'https://crmapi.onrender.com/vendor/'; 
    const res1 = await axios.post(apiEndpoint, 
        {
         customerId: val._id,
         message: `Hi ${val.name}, here is 10% off on your next order`,
         email: val.email 
       });
})

module.exports = { getAllCampaigns , addCampaign , sendMessageToAllVendors }
