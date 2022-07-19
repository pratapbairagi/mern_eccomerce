
// const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY)
const stripe = require("stripe")("sk_test_51Kyc5BSAAbMphS3M86BxISfS7nwkkVrFE9DaQ9o6THJwqVMrILCr77aTBiVengwb29mhZCtUgsmC0CR3s8tcxTEX00TQKeuRwr")


const asyncCatchError = require("../utils/asyncCatchError")
const ErrorHandler = require("../utils/errorHandler")

exports.getStripeKey =  asyncCatchError(async(req,res,next)=>{
    res.status(200).json({
        success: true,
        message: "stripe key fetched successfully !",
        stripeKey : process.env.STRIPE_API_PUBLISH_TOKEN
    })
})

exports.createPayment = asyncCatchError(async(req,res,next)=>{

    const result = await stripe.paymentIntents.create({
        amount :req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce2"
        }
    })

    if(!result.client_secret){
        return next(new ErrorHandler("Unable to make payment due to missing api key", 404))
    }
    
    res.status(201).json({
        success: true,
        message : "Payment successful !",
        client_secret : result.client_secret
    })
})