const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const fileupload = require("express-fileupload")
const globalErrorHandler = require("./middleware/globalErrorHandlerMiddleware")
const MONGO_DB_CONNECTION = require("./config/mongoDbConnection")
const path = require("path")

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/.env"})
}

// import routes
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const orderRoute = require("./routes/orderRoute")
const paymentRoute = require("./routes/paymentRoute")
const productCategoryRoute = require("./routes/productCategoryRoute")
const messageRoute = require("./routes/messageRoute")
const homeBannerRoute = require("./routes/homeBannerRoute")

// env file
// dotenv.config({path:"backend/config/.env"})



// middlewares
app.use(cors())
app.use(express.json({extended: true, limit:"25mb"}))
app.use(express.urlencoded({extended:true, limit:"25mb"}))
app.use(cookieParser())
app.use(fileupload())


// apply routes middleware
app.use("/api", userRoute)
app.use("/api", productRoute)
app.use("/api", orderRoute)
app.use("/api", paymentRoute)
app.use("/api", productCategoryRoute)
app.use("/api", messageRoute)
app.use("/api", homeBannerRoute)


if(process.env.NODE_ENV){
    app.use(express.static(path.join(__dirname,"../frontend/build")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
    })
}

// global error handler middleware
app.use(globalErrorHandler)

// mongo db connection call
// MONGO_DB_CONNECTION(process.env.MONGO_DB_CONNECTION_URL)
MONGO_DB_CONNECTION()


app.listen(process.env.PORT, ()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`)
})

