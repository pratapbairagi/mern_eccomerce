const express = require("express")
const { createProduct, getAllProducts, getSingleProductUser, review, updateProduct, deleteProduct } = require("../controller/productController")
const {userAuthenticate} = require("../middleware/userAuthenticate")
const userRole = require("../middleware/userRole")

const productRoute = express.Router()

productRoute.route("/v1/products").get(getAllProducts)
productRoute.route("/v1/product/:id").get(getSingleProductUser)
productRoute.route("/v1/product/create").post(userAuthenticate,createProduct)
// update product
productRoute.route("/v1/product/update/:id").put(userAuthenticate, userRole("admin") ,updateProduct)
productRoute.route("/v1/product/delete/:id").delete(userAuthenticate, userRole("admin"), deleteProduct)


// review
productRoute.route("/v1/product/review/:id").put(userAuthenticate,review)


module.exports = productRoute