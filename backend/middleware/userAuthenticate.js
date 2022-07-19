const  asyncCatchError = require("../utils/asyncCatchError")
const j = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userModel")

exports.userAuthenticate = asyncCatchError(async(req, res, next)=>{
    const {jwt} = req.cookies

    const {id} = j.verify(jwt, process.env.COOKIE_TOKEN_SECRETY_KEY)

    const user = await User.findById(id)

    if(!user){
        return next(new ErrorHandler("User needs to login !", 401))
    }

    req.user = user

    next()

})