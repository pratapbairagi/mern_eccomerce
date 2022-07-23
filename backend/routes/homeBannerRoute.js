const express = require("express")
const { createHomeBanner, getAllHomeBanner, getSingleBanner, editBanner, deleteBanner } = require("../controller/homeBannerController")
const { userAuthenticate } = require("../middleware/userAuthenticate")
const userRole = require("../middleware/userRole")

const homeBannerRoute = express.Router()

homeBannerRoute.route("/v1/admin/banner/create").post(userAuthenticate,userRole("admin"),createHomeBanner)
homeBannerRoute.route("/v1/banners").get(getAllHomeBanner)
homeBannerRoute.route("/v1/admin/banner/:id").get(userAuthenticate, userRole("admin"),getSingleBanner)
homeBannerRoute.route("/v1/admin/banner/edit/:id").put(userAuthenticate, userRole("admin"), editBanner)
homeBannerRoute.route("/v1/admin/banner/delete/:id").delete(userAuthenticate, userRole("admin"), deleteBanner)




module.exports = homeBannerRoute