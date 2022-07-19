const asyncCatchError = require("../utils/asyncCatchError")
const ProductCategory = require("../models/productCategoryModel")
const ErrorHandler = require("../utils/errorHandler")
const cloudinary = require("../config/cloudinaryConfig")

exports.createProductCategory = asyncCatchError(async(req, res, next)=>{

    const {categoryName, categoryImage} = req.body

    const category = await ProductCategory.findOne({category:categoryName})

    if(category){
        return next( new ErrorHandler("Category with this name already exist !", 400))
    }

    const result = await cloudinary.uploader.upload(categoryImage,{
        folder: "product category"
    })

    const productCategory = await ProductCategory.create({
        category : categoryName,
        image : {
            public_id : result.public_id,
            url : result.secure_url
        }
    })

    res.status(201).json({
        success : true,
        message : "Product Category Created Successfully !",
        category : productCategory
    })

})

// get all categories

exports.GetProductCategories = asyncCatchError(async(req, res, next)=>{

    const categories = await ProductCategory.find()

    res.status(200).json({
        success: true,
        message : "Product categories fetched successfully !",
        category : categories
    })
})

// get single category

exports.GetSingleProductCategory = asyncCatchError(async(req, res, next)=>{

    const {id} = req.params
    const category = await ProductCategory.findById(id)

    if(!category){
        return next(new ErrorHandler("Category does not exist !", 404))
    }

    res.status(200).json({
        success: true,
        message : "Product categories fetched successfully !",
        category : category
    })
})


// get single category

exports.EditSingleProductCategory = asyncCatchError(async(req, res, next)=>{

    const {id} = req.params
    const {category, image} = req.body

    const isCategory = await ProductCategory.findById(id)

    if(!isCategory){
        return next(new ErrorHandler("Category does not exist !", 404))
    }

    if(image){
        await cloudinary.uploader.destroy(isCategory.image.public_id)

        const result = await cloudinary.uploader.upload(image,{
            folder : "product category"
        })

        isCategory.image = {
            public_id : result.public_id,
            url : result.secure_url
        }
    }

    isCategory.category = category

    await isCategory.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "Category updated successfully !"
    })
    
})


    // delete category
    exports.DeleteProductCategory = asyncCatchError(async (req, res, next)=>{

        const {id} = req.params

        const isCategory = await ProductCategory.findById(id)

        if(!isCategory){
            return next( new ErrorHandler("Product Category does not exist !", 404))
        }

        await cloudinary.uploader.destroy(isCategory.image.public_id)

        await isCategory.remove()

    res.status(200).json({
        success: true,
        message : "Product category deleted successfully !"
    })
})