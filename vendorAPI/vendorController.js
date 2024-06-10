

const getAllVendors = (req,res)=>{
    res.status(200).json({
        message : "This is dummy vendor api"
    })
}

const messageReceived = (req,res)=>{
    const { customerId } = req.body;
    res.status(200).json({
        message : `message recieved successfully by ${customerId}`
    })
}



module.exports = { getAllVendors , messageReceived }