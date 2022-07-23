const asyncCatchError = require("../utils/asyncCatchError")
const ErrorHandler = require("../utils/errorHandler")
const cloudinary = require("../config/cloudinaryConfig")
const HomeBanner = require("../models/homeBannerModel")

exports.createHomeBanner = asyncCatchError(async(req, res, next)=>{
    const user = req.user

    const {paragraph, category, image} = req.body

    if(!paragraph && !category && !image){
        return next( new ErrorHandler("All fields are required !"))
    }

    const result = await cloudinary.uploader.upload(image,{
        folder : "home banner"
    })

    await HomeBanner.create({
        paragraph,
        category,
        seller:{
            id:user._id,
            name: user.name,
            email:user.email
        },
        image:{
            public_id: result.public_id,
            url : result.secure_url
        },
        createdAt: Date.now()
    })

    res.status(201).json({
        successL: true,
        message: "Banner created successfully !",
    })
})

exports.getAllHomeBanner = asyncCatchError(async(req,res,next)=>{
    const homeBanners = await HomeBanner.find()

    res.status(200).json({
        success : true,
        banners : homeBanners
    })
})

exports.getSingleBanner = asyncCatchError(async(req, res, next)=>{
    const banner = await HomeBanner.findById(req.params.id)

    if(!banner){
        return next( new ErrorHandler("Unable to get particular banner !", 404))
    }

    res.status(200).json({
        success: true,
        message:"Banner fetched successfully !",
        banner
    })
})

exports.editBanner = asyncCatchError(async(req,res, next)=>{
    const bannerId = req.params.id

    const isBannerExist = await HomeBanner.findById(bannerId)

    if(!isBannerExist){
        return next(new ErrorHandler("Banner does not exist !", 404))
    }

    const {paragraph, category, image} = req.body

    if(!paragraph && !category){
        return next( new ErrorHandler("All fields are required !", 400))
    }

    if(image.includes("https://res.cloudinary.com/protapbairagi")){

        isBannerExist.paragraph = paragraph
        isBannerExist.category = category
        
    }
    else{

        await cloudinary.uploader.destroy(isBannerExist.image.public_id)

        const result = await cloudinary.uploader.upload(image,{
            folder: "home banner"
        })

        isBannerExist.paragraph = paragraph
        isBannerExist.category = category
        isBannerExist.image = {
            public_id : result.public_id,
            url : result.secure_url
        }
    }

    await isBannerExist.save({validateBeforeSave:false})

    res.status(200).json({
        success : true,
        message : "Banner updated successfully !"
    })

})

exports.deleteBanner = asyncCatchError(async(req, res, next)=>{

    console.log("working")

    const isBannerExist = await HomeBanner.findById(req.params.id)

    if(!isBannerExist){
        return next( new ErrorHandler("Banner does not exist !", 404))
    }

  await cloudinary.uploader.destroy(isBannerExist.image.public_id)

   await isBannerExist.remove()

   res.status(200).json({
    success : true,
    message : "Banner deleted successfully !"
   })


})