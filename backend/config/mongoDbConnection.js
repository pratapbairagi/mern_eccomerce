const mongoose = require("mongoose")

// module.exports = async( MONGO_DB_CONNECTION_URL ) =>{
module.exports = async() =>{

    try {
        // mongoose.connect(MONGO_DB_CONNECTION_URL).then(()=>{
        mongoose.connect("mongodb+srv://ecommerce:18May1994@cluster0.5qgqh.mongodb.net/ecommerce?retryWrites=true&w=majority").then(()=>{

            console.log("mongo db connected successfully")
        })
        .catch((err)=>{
            console.log("mongo db connection err", err)
        })
    } catch (error) {
        console.log("mongo db connection error", error)
    }
}