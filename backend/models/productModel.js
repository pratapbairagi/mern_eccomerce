const mongoose = require("mongoose")

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter product name !"],
        minlength: [3, "Product name should be 3 charators atleat !"],
        maxlength: [20, "Product name can not exceed 20 charators !"]
    },
    category: {
        type: String,
        required: [true,"Please enter product category name !"],
        maxlength: [15, "Product name can not exceed 15 charators !"]

    },
    description: {
        type: String,
        required: [true,"Please enter product description !"],
        minlength: [10, "Product description should be 10 charators atleat !"],
    },
    images: [
        {
            public_id: {
                type: String,
                required :true
            },
            url: {
                type: String,
                required :[true, "Please upload product image !"]
            }
        }
    ],
    stock: {
        type: Number,
        required:[true,"Please enter product stock !"],
        maxlength:[3,"Stock can not exceed 3 digits !"],
        default: 1
    },
    ratings: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            comment: {
                type : String
            },
            rating: {
                type : String
            },
            user:{
                type : mongoose.Schema.ObjectId,
                ref: "user", 
                required: true
            },
            name:{
                type : String,
                required: true
            },
            userImage:{
                type : String
            },
            time: {
                type : Date,
                default : Date(),
                required: true
            }
        }
    ],
    sold:{
        type : Number,
        required : true,
        default : 0
    },
    offer:{
        avail:{
            type : String,
            default : "no"
        },
        percentage:{
            type : Number,
            default : 0
        }
    },
    price: {
        type: Number,
        required: true
    },
    seller : {
        name : {
            type : String,
            required : true
        },
        id : {
            type : String,
            required : true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = new mongoose.model("product", productModel)

module.exports = Product