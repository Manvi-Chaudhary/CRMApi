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
    const { communicationLogId  } = req.body ;
    const communicationLog = await campaign.findById(communicationLogId);
    
    const customers = await Customer.find({ _id: { $in: communicationLog.audience.customerId } })
    const messages = customers.map(customer => {
        return {
          customerId: customer._id,
          message: `Hi ${customer.name}, here is 10% off on your next order`,
          email: customer.email 
        };
      });
  
 
    const apiEndpoint = 'https://crmapi.onrender.com/vendor'; 
    const response = await axios.post(apiEndpoint, { messages });
    
    for (let message of messages) {
        await simulateDeliveryReceipt(communicationLogId);
    }
    
    //console.log(response.data)
    res.status(201).json({
        message : `message sent successfully to all the vendors in communication_log with id : ${communicationLogId}` 
    })
})

async function simulateDeliveryReceipt(communicationLogId) {
    try {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
  
      const deliveryReceiptApiEndpoint = 'https://crmapi.onrender.com/delivery-receipt'; 
      const response = await axios.post(deliveryReceiptApiEndpoint, {
        communicationLogId,
        status
      });
  
      await campaign.findByIdAndUpdate(communicationLogId, {
        $set: {
          status,
          updatedAt: new Date()
        }
      });
  
      console.log(`Delivery receipt for ${communicationLogId}: ${status}`);
    } catch (error) {
      console.error('Error simulating delivery receipt:', error);
    }
  }
  


module.exports = { getAllCampaigns , addCampaign , sendMessageToAllVendors }
