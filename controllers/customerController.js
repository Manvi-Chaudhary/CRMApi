const asyncHandler = require("express-async-handler");
const customer = require("../models/customerModel");

//@desc get all customers
//@route GET /api/customer
//@access public
const getAllCustomers = asyncHandler ( async (req,res) => {
    const res1 = await customer.find();
    res.status(200).json(res1);
})

//@desc get customer by id
//@route GET /api/customer/:id
//@access public
const getCustomerByID = asyncHandler ( async (req,res) =>  {
    const id = req.params.id
    const res1 = await customer.findById(id);
    if (!res1){
        res.status(404);
        throw new Error("User not found",req,res)
    }
    res.status(200).json(res1);
})

//@desc add customer 
//@route POST /api/customer
//@access public
const addCustomer = asyncHandler ( async (req,res)=>{
    const { name , email , phone } = req.body;
    if (!name || !phone || !email){
        res.status(400);
        throw new Error("All fields are mandatory",req,res)
    }
    const res1 = await customer.create({
        name,
        email,
        phone,
    })
    res.status(201).json(res1)

})

//@desc update customer by id
//@route PUT /api/customer/:id
//@access public
const updateCustomer = asyncHandler ( async (req,res) => {
    const id = req.params.id;
    const { name , email , phone } = req.body;
    const res1 = await customer.findById(id);
    if (!res1){
        res.status(404);
        throw new Error("Customer not found",req,res)
    }
    const updatedCustomer = await customer.findByIdAndUpdate(
        id,
        req.body,
        { new : true} 
    )
    res.status(200).json({
        message : `customer with id : ${id} is updated`
    })
})

//@desc delete customer by id
//@route DELETE /api/customer/:id
//@access public
const deleteCustomer = asyncHandler( async (req,res) => {
    const id = req.params.id;
    const res1 = await contacts.findById(id);
    if (!res1){
        res.status(404);
        throw new Error("Customer not found",req,res)
    }
    await contacts.deleteOne({ _id : id})
    
    res.status(200).json({
        message : `customer with id : ${id} is deleted`
    })
})




module.exports = {getAllCustomers,getCustomerByID,addCustomer,updateCustomer,deleteCustomer}