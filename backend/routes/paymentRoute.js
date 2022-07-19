
const express = require("express")
const { getStripeKey, createPayment } = require("../controller/paymentController")
const userAuthenticate = require("../middleware/userAuthenticate")

const paymentRoute = express.Router()

paymentRoute.route("/v1/getStripeApiKey").get(getStripeKey)
paymentRoute.route("/v1/payment/create").post(createPayment)

module.exports = paymentRoute