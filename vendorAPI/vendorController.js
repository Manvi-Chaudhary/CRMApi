


const getAllVendors = (req,res)=>{
    res.status(200).json({
        message : "This is dummy vendor api"
    })
}

const messageReceived = (req,res)=>{
    const {  communicationLogId  } = req.body;
    
    res.status(200).json({
        message,
        communicationLogId : communicationLogId,
    })
}



module.exports = { getAllVendors , messageReceived }