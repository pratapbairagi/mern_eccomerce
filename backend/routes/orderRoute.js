
const express = require("express")
const { orderCreate, getAllOrder, updateOrder, getUserOrders } = require("../controller/orderController")
const { userAuthenticate } = require("../middleware/userAuthenticate")
const userRole = require("../middleware/userRole")

const orderRoute = express.Router()

orderRoute.route("/v1/order/create").post(userAuthenticate,orderCreate)
orderRoute.route("/v1/orders").get(userAuthenticate, userRole("admin"), getAllOrder)
orderRoute.route("/v1/my/orders").get(userAuthenticate,getUserOrders)


orderRoute.route("/v1/order/update").post(userAuthenticate, userRole("admin"), updateOrder)
// `/api/v1/order/update`


module.exports = orderRoute