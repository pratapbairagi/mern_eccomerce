const express = require("express")
const { createProductCategory,  GetProductCategories, GetSingleProductCategory, EditSingleProductCategory, DeleteProductCategory } = require("../controller/productCategoryController")
const { userAuthenticate } = require("../middleware/userAuthenticate")
const userRole = require("../middleware/userRole")

const productCategoryRoute = express.Router()

productCategoryRoute.route("/v1/product/category/create").post(userAuthenticate, userRole("admin"), createProductCategory)
productCategoryRoute.route("/v1/products/categories").get(GetProductCategories)
productCategoryRoute.route("/v1/products/category/:id").get(userAuthenticate, userRole("admin"), GetSingleProductCategory)
productCategoryRoute.route("/v1/products/category/:id").put(userAuthenticate, userRole("admin"), EditSingleProductCategory)
productCategoryRoute.route("/v1/products/category/:id").delete(userAuthenticate, userRole("admin"), DeleteProductCategory)







module.exports = productCategoryRoute