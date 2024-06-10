const express = require("express");
const dotenv = require("dotenv").config();
const app = express()
const db = require("./config/connect")
const errorHandler = require("./middlewares/errorHandler");
const connectionTODB = require("./config/connect")

connectionTODB.connectToDB()

const port = process.env.PORT || 5001 ;
app.listen(port,()=>{
    console.log("server is listening at",port);
})

app.use(express.json());

app.use("/customer",require("./routes/customerRoutes"));
app.use("/order",require("./routes/orderRoutes"))
app.use("/campaign",require("./routes/campaignRoutes"))

app.use("/vendor",require("./vendorAPI/vendorRoute"))


app.use(errorHandler)

app.get("/",(req,res)=>{
    console.log("Request Made")
    res.json({developer : "Manvi Chaudhary",
        message : "This api is developed for CRM assignment of Xeno"})
})