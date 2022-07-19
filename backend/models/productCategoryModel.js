const mongoose = require("mongoose")

const ProductCategorySchema = new mongoose.Schema({
    category : {
        type : String,
        maxlength : [10, "Category name can not be exceed 10 charactors !"]
    },
    image : {
        public_id:{
            type : String
        },
        url : {
            type : String
        }
    }
})

const ProductCategory = new mongoose.model("ProductCategory", ProductCategorySchema)

module.exports = ProductCategory
