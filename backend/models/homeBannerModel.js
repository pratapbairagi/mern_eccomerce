const mongoose = require("mongoose")

const homeBannerSchema = new mongoose.Schema({
    paragraph:{
        type:String,
        require : [true, "please fill banner paragraph !"]
    },
    category:{
        type:String,
        required : [true, "please fill category of product for banner !"]
    },
    image:{
        public_id:{
            type : String,
            required : [true, "please upload banner image "]
        },
        url:{
            type : String,
            required : [true, "please upload banner image "]
        }
    },
    createdAt:{
        type : Date,
        default : Date.now()
    },
    seller:{
        id:{
            type : String,
            required : [true, "Need seller info !"]
        },
        email:{
            type : String,
            required : [true, "Need seller info !"]
        },
        name :{
            type : String,
            required : [true, "Need seller info !"]
        }
    }
})

const HomeBanner = new mongoose.model("homeBanner", homeBannerSchema)

module.exports = HomeBanner