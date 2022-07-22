const Message = require("../models/messageModel");
const User = require("../models/userModel");
const asyncCatchError = require("../utils/asyncCatchError");
const ErrorHandler = require("../utils/errorHandler");

exports.sendMessageByUser = asyncCatchError(async(req, res, next)=>{
    const {name, mail, message, id,sellerId, sellerName, by} = req.body

    const seller = await User.findById(sellerId)

    if(!seller){
        return next( new ErrorHandler("Seller does not exist or removed !", 404))
    }

    const user = await User.findById(id)

    if(!user){
        return next( new ErrorHandler("User doe not exist or need to login !", 404))
    }

    const isMessageExist = await Message.findOne({"seller.id":sellerId})

    if(isMessageExist){
         isMessageExist.messages.push({
             message : message,
             createdAt : Date.now(),
             by : by
         })

        await isMessageExist.save({validateBeforeSave:false})
    }
    if(!isMessageExist){

    await Message.create({
        user:{
            name: user.name,
            id:user._id,
            email:user.email
        },
        seller:{
            name: seller.name,
            id:seller._id,
            email:seller.email
        },
        messages:{
            message: message,
            createdAt: Date.now(),
            by: by
        }
    })
    }

    res.status(201).json({
        success : true,
        message : "Message sent successfully !"
    })

})

// get all messages
exports.getAllMessages = asyncCatchError(async(req, res, next)=>{

    // const sellerMessages = await Message.find({"seller._id":req.params.id})
    const sellerMessages = await Message.find({"seller.id": req.params.id})

    // console.log(sellerMessages)



    res.status(200).json({
        success: true,
        message : "Get all messages successfully !",
        messages : sellerMessages
    })
})