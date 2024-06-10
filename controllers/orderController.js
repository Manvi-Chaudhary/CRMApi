const asyncHandler = require("express-async-handler");
const order = require("../models/orderModel");
const customer = require("../models/customerModel")


//@desc get all oreders
//@route GET /api/order
//@access public
const getAllOrders = asyncHandler (async (req,res) => {
    const { amountThreshold  , orderCountThreshold , lastVisitedThreshold } = req.query
    if(!amountThreshold || !orderCountThreshold || !lastVisitedThreshold){
      const result = await order.find();
      res.status(200).json(result)
    }
    const amtThresh = parseInt(amountThreshold);
    const orderThresh = parseInt(orderCountThreshold);
    const agg = [
    {
      '$group': {
        '_id': '$customer_id', 
        'totalAmount': {
          '$sum': '$amount'
        }, 
        'orderCount': {
          '$sum': 1
        },
        'lastVisited' : {
            '$max' : '$createdAt'
        } ,
        'orders': {
          '$push': {
            'order_id': '$_id', 
            'amount': '$amount', 
            'date' : '$createdAt'
          }
        }
      }
    }, {
      '$match': {
        'totalAmount': {
          '$gt': amtThresh
        }, 
        'orderCount': {
          '$lte': orderThresh
        },
        'lastVisited' : { 
            '$lte' : new Date(lastVisitedThreshold)
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'customer_id': '$_id', 
        'totalAmount': 1, 
        'orderCount': 1, 
        'lastVisited': 1, 
        'orders': 1
      }
    }
  ];

  const result = await order.aggregate(agg);
    res.status(200).json(result)
})

//@desc get oreder by id
//@route GET /api/order/:id
//@access public
const getOrderByID = asyncHandler (async (req,res) =>  {
    const id = req.params.id
    const res1 = await order.findById(id);
    if (!res1){
        res.status(404);
        throw new Error("Order not found",req,res)
    }
    res.status(200).json(res1)
})

//@desc add a oreder
//@route POST /api/order
//@access public
const addOrder = asyncHandler( async (req,res) => {
    const { customerName , amount } = req.body
    if (!customerName || !amount){
        res.status(400);
        throw new Error("All fields are mandatory",req,res)
    }
    const name = customerName
    const customer1 = await customer.findOne({ name });
    const customer_id = customer1.id
    const res1 = await order.create({
        customer_id,
        amount,
    })
    res.status(201).json(res1)
})



module.exports = {getAllOrders,getOrderByID,addOrder}