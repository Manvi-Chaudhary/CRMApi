const mongoose = require("mongoose") 

const connectToDB = ( async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            dbName: process.env.DB_NAME ?? "test"
        })
        console.log(`connected to database : ${mongoose.connection.db.databaseName}`)
    }catch (err) {
        console.log("Connection failed :",err)
    }
})

module.exports = {
    connectToDB
}