const ErrorHandler = require("../utils/errorHandler");
const asyncCatchHandler = require("../utils/asyncCatchError")
const cloudinary = require("../config/cloudinaryConfig");
const Product = require("../models/productModel");

exports.getAllProducts = asyncCatchHandler(async(req,res,next)=>{

    const totalProducts = await Product.countDocuments()

    const resultPerPage = 3
    const currentPage = req.query.page

    const skip = resultPerPage * Number(currentPage - 1)

    // let query = {}

    // if(req.query.keyword){
    //     query.name = req.query.keyword
    // }
    // if(req.query.category){
    //     query.category = req.query.category
    // }


    const query = {
        name:{
            $regex: req.query.keyword,
            $options : "i"
        }
        ,
        category:{
            $regex : req.query.category,
            $options: "i"
        }
        ,
        price:{
            $gte: req.query.price.gte,
            $lte: req.query.price.lte
        }
    }

    const sort = req.query.sort ? {
        "price": req.query.sort
    } : {}

    const sortLatest = {
        "createdAt" : -1
    }

    const sellSort = {
        "sold" : -1
    }


    // let products = req.query.keyword.length > 0 ? await Product.find({ name:{$regex: new RegExp(req.query.keyword)} }).limit(resultPerPage).skip(skip) : await Product.find().limit(resultPerPage).skip(skip)
    let products = await Product.find(query).sort(sort).limit(resultPerPage).skip(skip)

    let latestProducts = await Product.find(query).sort(sortLatest).limit(5).skip(skip)

    let topSellingProducts = await Product.find(query).sort(sellSort).limit(5).skip(skip)

    
    const resultFound = products.length

    if(!products){
        return next( new ErrorHandler("Something went wrong !", 404))
    }

    res.status(200).json({
        success: true,
        message:"products fetched successfully !",
        products,
        totalProducts,
        resultPerPage, 
        resultFound,
        latestProducts,
        topSellingProducts
    })
})

exports.createProduct = asyncCatchHandler(async(req, res, next)=>{

    const creator = req.user

    const { name , category , description , price , stock , images, offerAvail, offerPercentage } = req.body


    if(!name || !category || !description || !price || !stock || !images){
        return next(new ErrorHandler("All fields are required !", 400))
    }

    let imageLinks = []

    for (let i = 0; images.length > i; i++){
       
        const result = await cloudinary.uploader.upload(images[i],{
            folder : "ecommerce_project2_products"
        })

        imageLinks.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    const oAvail = offerAvail === "yes" ? "yes" : "no"

    const product = await Product.create({
        name,
        category,
        description,
        stock,
        price,
        images: imageLinks,
         offer : {
                avail : oAvail,
                percentage : offerPercentage
        },
        seller :{
            name : creator.name,
            id : creator._id
        }
    })

    res.status(201).json({
        success : true,
        message :"Product added successfully !",
        product
    })
})

// update product
exports.updateProduct = asyncCatchHandler(async(req,res, next)=>{
    const productId = req.params.id
    const {name, category, description, price, stock, oldImages, newImages} = req.body

    const product = await Product.findById(productId)

    if(!product){
        return next( new ErrorHandler("Product does not exist !", 404))
    }

    let imgaesLink = []

    if(newImages.length>0){

        for(let i = 0; oldImages.length>i; i++){
           await cloudinary.uploader.destroy(oldImages[i].public_id)
        }

        for(let i = 0; newImages.length>i; i++){
        
        const result = await cloudinary.uploader.upload(newImages[i],{
            folder : "ecommerce_project2_products"
        })

        imgaesLink.push({
            public_id : result.public_id,
            url : result.secure_url
        })
    }

    }
    else{
        imgaesLink = await oldImages
    }

     await Product.findByIdAndUpdate({_id:productId}, {name,category, price,description, stock, images:imgaesLink }, {new: true} )

     res.status(200).json({
         success : true,
         message : "Product updated successfully !"
     })



    
})

// get single product
exports.getSingleProductUser = asyncCatchHandler(async(req,res,next)=>{
    const id = req.params.id
    const product = await Product.findById(id)

    if(!product){
        return next(new ErrorHandler("Product does not exist !", 404))
    }

    res.status(200).json({
        success : true,
        message : "Product details fetched successfull !",
        product
    })
})

// product review create/update
exports.review = asyncCatchHandler(async(req, res, next)=>{
    const {id} = req.params
    const user = req.user

    const product = await Product.findById(id)

    if(!product){
        return next( new ErrorHandler("Product does not exist to review!", 404))
    }

    let isReviewExist = await product.reviews.find(rev=>rev.user.toString() === user._id.toString())

    const review = {
        user : user._id,
        name : user.name,
        comment : req.body.comment,
        rating : req.body.rating,
        time: Date.now(),
        userImage : user.avatars.url
    }

    if(isReviewExist){
       const existReview = await product.reviews.find(rev=>rev.user.toString()===user._id.toString() )

       existReview.comment = req.body.comment,
       existReview.rating = req.body.rating,
       existReview.name = user.name,
       existReview.user = user._id,
       existReview.time = Date.now(),
       existReview.userImage = user.avatars.url

    }
    else{
       await product.reviews.push(review)

    }
    let avgRevRatings = 0
    product.reviews.forEach(rev=>{
       return avgRevRatings+= +rev.rating
    })

     product.ratings =  avgRevRatings / product.reviews.length
     product.numberOfReviews = product.reviews.length

     await product.save({validateBeforeSave:false})

     res.status(201).json({
         success : true,
         message : "Reviewd successful !",
         review
     })
//  7982966351 water tanker
})

//  delete product by admin
exports.deleteProduct = asyncCatchHandler(async(req,res,next)=>{
    const id = req.params.id

    const product = await Product.findById(id)

    if(!product){
        return next(new ErrorHandler("Product not found !", 201))
    }

   await product.images.forEach((p)=>{
       return cloudinary.uploader.destroy(p.public_id)
    })

    await product.remove()

    res.status(200).json({
        success : true,
        message : "Product deleted successfully !"
    })
})