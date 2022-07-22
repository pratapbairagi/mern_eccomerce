const Order = require("../models/orderModel")
const asyncCatchError = require("../utils/asyncCatchError")
const errorHandler = require("../middleware/globalErrorHandlerMiddleware")
const Product = require("../models/productModel")

exports.orderCreate = asyncCatchError(async(req, res, next)=>{
    const user  = req.user
    const {
        shippingInfo, 
        orderItems,
        paymentInfo,
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice
        } = req.body

        if( shippingInfo && orderItems && paymentInfo && itemsPrice && shippingPrice && taxPrice && totalPrice){
            return next(new errorHandler("All fields are required !", 400))
        }

       const newOrder = await Order.create({
        shippingInfo, 
        orderItems,
        paymentInfo,
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice,

        user,
        paidAt: Date.now()
        })

        res.status(201).json({
            success: true,
            message:"Order placed successfullt !",
            order: newOrder
        })
    
})

exports.getAllOrder = asyncCatchError(async(req,res,next)=>{
    const orders = await Order.find()

    res.status(200).json({
        success : true,
        message : "Orders fetched successfully !",
        orders: orders
    })
})

exports.getUserOrders = asyncCatchError(async(req,res,next)=>{

    const orders = await Order.find({user:req.user._id})

    if(!orders){
        return next(new errorHandler("No order found !", 404))
    }

    res.status(200).json({
        success : true,
        orders : orders,
        message : "Orders fetched successfully !"
    })


})

exports.updateOrder = asyncCatchError(async(req, res, next)=>{

    const orderId = req.body.orderId
    const orderStatus = req.body.orderStatus
    const productId = req.body.productId

    const order = await Order.findById(orderId)

    if(!order){
        return next(new errorHandler("Order does not exist !", 404))
    }

    const foundProduct = order.orderItems.find(v=>v.product.toString()===productId.toString())

    if(foundProduct.orderStatus==="delivered"){
        return next(new errorHandler(`this product ${foundProduct.name} already been delivered !`, 400))
    }

    const product = await Product.findById(productId)

    if(foundProduct.orderStatus==="shipped"){

        if(product.stock < foundProduct.quantity){
            return next(new errorHandler(`product : ${product.name} has not enough quantity to complete order !`,400))
        }

        product.stock-= foundProduct.quantity
        product.sold+= foundProduct.quantity

         await product.save({validateBeforeSave:false})

    }

     foundProduct.orderStatus = orderStatus

    if(foundProduct.orderStatus === "delivered"){
        foundProduct.deliveredAt = Date.now()
    }
    
    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success: true,
        order,
        message : `product : ${foundProduct.name} order status changed to ${foundProduct.orderStatus} successfully !`
    })

})

async function changeOrderStatusFun(productId, orderQuantity){

    const product = await Product.findById(productId)

    if(product.stock >= orderQuantity){
        product.stock-=orderQuantity
        product.sold += orderQuantity
        await product.save({validateBeforeSave:false})
    }
    
}