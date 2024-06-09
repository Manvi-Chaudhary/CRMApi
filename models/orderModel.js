const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    customer_id : {
        type : String,
        required :  [true,"Please provide a customer id"],
    },
    amount : {
        type : Number,
        required : [true,"Please provide a amount"]
    },
},
{
    timestamps : true
}
);

module.exports = mongoose.model("Orders",orderSchema)