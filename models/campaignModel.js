const mongoose = require("mongoose")

const campaignSchema = mongoose.Schema({
    audience : {
        type : Array,
        required : [true,"Please provide a customer id"]
    },
},
{
    timestamps : true
}
);

module.exports = mongoose.model("consumer_logs",campaignSchema)