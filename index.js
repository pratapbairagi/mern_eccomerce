const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const fileupload = require("express-fileupload")
const globalErrorHandler = require("./backend/middleware/globalErrorHandlerMiddleware")
const MONGO_DB_CONNECTION = require("./backend/config/mongoDbConnection")


// import routes
const userRoute = require("./backend/routes/userRoute")
const productRoute = require("./backend/routes/productRoute")
const orderRoute = require("./backend/routes/orderRoute")
const paymentRoute = require("./backend/routes/paymentRoute")
const productCategoryRoute = require("./backend/routes/productCategoryRoute")
const messageRoute = require("./backend/routes/messageRoute")

// env file
dotenv.config({path:"./backend/config/.env"})



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

// global error handler middleware
app.use(globalErrorHandler)

// mongo db connection call
MONGO_DB_CONNECTION(process.env.MONGO_DB_CONNECTION_URL)

app.listen(process.env.PORT, ()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`)
})

