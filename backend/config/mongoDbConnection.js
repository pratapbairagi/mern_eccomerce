const mongoose = require("mongoose")

module.exports = async( MONGO_DB_CONNECTION_URL ) =>{
    try {
        mongoose.connect(MONGO_DB_CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
            console.log("mongo db connected successfully")
        })
        .catch((err)=>{
            console.log("mongo db connection err", err)
        })
    } catch (error) {
        console.log("mongo db connection error", error)
    }
}