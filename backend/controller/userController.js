const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler")
const asyncCatchHandler = require("../utils/asyncCatchError")
const cloudinary = require("../config/cloudinaryConfig")
const sendMail = require("../config/mailConfig")
const crypto = require("crypto")

exports.regitesrNewUser = asyncCatchHandler(async(req, res, next) =>{
        const {name, email, password, avatars, phone } = req.body

        let image={
            public_id :"",
            url :""
        }

        if( !name || !email || !password ){
            return next( new ErrorHandler("All fields are required !", 400))
        }

        const isEmailRegister = await User.findOne({email: email})

        if(isEmailRegister){
            return next( new ErrorHandler("This email id is already registered !", 400))
        }

        const isNameExist = await User.findOne({name:name})

        if(isNameExist){
            return next( new ErrorHandler("Name already exist, please choose different name !"), 400)
        }

       const result = await cloudinary.uploader.upload(avatars,{
            folder : "ecommerce_project2_users"
        })

            image ={
            public_id : result.public_id,
            url : result.secure_url
        }


        const user = await User.create({
            name,
            email,
            password,
            phone,
            avatars : image
        })

        // now generate a cookie to authenticate user
        const token = await user.generateToken()

        // cookie config
        const cookieOptions ={
            httpOnly: true,
            expire : Date(Date.now() + 24 * 60 * 60 *1000 )
        }

        res.status(201).cookie("jwt", token, cookieOptions).json({
            success : true,
            message:"User registered successfully !",
            user
        }) 
})

//  login user
exports.loginUser = asyncCatchHandler(async(req, res, next)=>{

    const {email, password} = req.body

    const isUserExist = await User.findOne({email:email})

    if(!isUserExist){
        return next(new ErrorHandler("Email or Password is not valid !", 400))
    }

    const isPasswordMatch = await isUserExist.comparePassword(password)

    if( !isPasswordMatch){
        return next( new ErrorHandler("Email or Password is not valid !", 400))
    }

    const token = await isUserExist.generateToken()

    const cookieOptions={
        httpOnly:true,
        expire : Date(Date.now() + 24 * 60 * 60 * 1000 )
    }

    res.status(200).cookie("jwt", token, cookieOptions).json({
        success : true,
        message : "User logged in successfully !",
        user : isUserExist
    })
})

// user looged
exports.userLogged = asyncCatchHandler(async(req, res, next)=>{
    const id = req.user._id

    const user = await User.findById(id)

    if(!user){
        next(new ErrorHandler("Login required !", 400))
    }

    res.status(200).json({
        success : true,
        message : "user logged in",
        user
    })
})

// user logg out
exports.logout = asyncCatchHandler(async(req, res, next)=>{

    const cookieOptions ={
        httpOnly : true,
        expires :  new Date(Date.now())
    }

    res.status(200).cookie("jwt", null, cookieOptions).json({
        success : true,
        message: "Logged out successfully !"
    })
})

// get all users -- admin
exports.getAllUsersAdmin = asyncCatchHandler(async(req, res, next)=>{
    const users = await User.find()

    if(!users){
        return next(new ErrorHandler("Someting went wrong , Unable to get users !", 404))
    }
     res.status(200).json({
         success : true,
         message : "Fetched all users successfully",
         users
     })
})

// single user by admin
exports.getSingleUserByAdmin = asyncCatchHandler(async(req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success : true,
        message : "User found successfully !",
        user
    })
})

//  edit user by user
exports.editProfileByUser = asyncCatchHandler(async(req,res,next)=>{

    const oldAvatarId = req.user.avatars.public_id
    const userid = req.user._id
    const {name, email, phone, password, oldAvatar, newAvatar} = req.body

    let user = await User.findById(userid)

    if(!user){
        return next(new ErrorHandler("user not authenticated !", 400))
    }

    if(!name || !email || !phone){
        return next(new ErrorHandler("all fields are required !", 400))
    }

    if(newAvatar){
        await cloudinary.uploader.destroy(oldAvatarId)

        const result = await cloudinary.uploader.upload(newAvatar,{
            folder:"ecommerce_project2_users"
        })

        user.name = name
        user.email =email
        user.phone = phone
        user.avatars = {
            public_id : result.public_id,
            url : result.secure_url
        }
    }
    else{
        user.name = name
        user.email =email
        user.phone = phone
        user.avatars = req.user.avatars
    }

    if(password){
        user.password = password
    }

    await user.save({validateBeforeSave : false})

    user = await User.findById(userid)

    res.status(201).json({
        success : true,
        message : "Profile updated successfully !",
        user : user,
    })
})

// update user role by admin
exports.updateUserRole = asyncCatchHandler(async(req,res,next)=>{
    const {name, phone, email, password, newAvatar, oldAvatarId, oldAvatar, role } = req.body
    const userId = req.params.id

    let user = await User.findById(userId)

    if(!user){
        return next( new ErrorHandler("user not found !", 404))
    }

    if(newAvatar){
        await cloudinary.uploader.destroy(oldAvatarId)

        const result = await cloudinary.uploader.upload(newAvatar,{
            folder :"ecommerce_project2_users"
        })

        user.name = name
        user.email = email
        user.phone = phone
        user.role = role
        user.avatars = {
            public_id : result.public_id,
            url : result.secure_url
        }
    }
    else{
        user.name = name
        user.email = email
        user.phone = phone
        user.role = role
        user.avatars = user.avatars
    }

    if(password){
        user.password = password

    }

    await user.save({validateBeforeSave:false})

    user = await User.findById(userId)

    res.status(200).json({
        success : true,
        message : "user role updated successfully",
        user
    })

}) 

// user delete by admin
exports.userDeleteByAdmin = asyncCatchHandler(async(req, res, next)=>{
    const id = req.params.id
    const user = await User.findById(id)

    if(!user){
        return next(new ErrorHandler("user not found !", 404))
    }

    await user.remove()

    res.status(200).json({
        success : true,
        message : " user deleted successfully !"
    })
})

// reset password mail
exports.passwordRecoveryMail = asyncCatchHandler(async(req, res, next)=>{

    const {mail, url} = req.body

    const user = await User.findOne({email:mail})

    if(!user){
        return next(new ErrorHandler(`email : ${mail} is not registered !`))
    }

    const token = await user.createResetPasswordToken()

    await user.save({validateBeforeSave:false})

    const mailLink = `${req.protocol}://${req.get("host")}/password/reset/${token}`
    // const mailLink = `${req.protocol}://localhost:3000/password/reset/${token}`

    const message = `websitename : Your reset password link is \n\n  ${mailLink} \n\nIf you are not requested this mail then, please ignore it !`

    try {
    await sendMail({
        to : user.email,
        subject : "Ecommerce3 reset password link !",
        message : message
    })

    res.status(200).json({
        success : true,
        message : `Reset password link has been sent to ${user.email}`
    })
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiry = undefined

        await user.save({validateBeforeSave:false})

        return next(new ErrorHandler("Invalid link or link has been expired !"))
    }
})

// password recover

exports.setNewPassword = asyncCatchHandler(async(req, res, next)=>{

    const {newPassword, confirmNewPassword} = req.body
    const token = req.params.token

    // create previous resetPasswordToken using token
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken : resetPasswordToken, 
        resetPasswordTokenExpiry : {$gt : Date.now()}
    })

    if(!user){
        return next( new ErrorHandler("Invalid link or link has been expired !", 400))
    }

    if(newPassword !== confirmNewPassword){
        return next( new ErrorHandler("New password and confirm password does not match !"))
    }

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiry = undefined

    await user.save({validateBeforeSave:false})

    res.status(200).json({
        success: true,
        message : "Password recovered successfully !"
    })

})