const express = require("express")
const { sendMessageByUser, getAllMessages } = require("../controller/messageController")
const { userAuthenticate } = require("../middleware/userAuthenticate")
const userRole = require("../middleware/userRole")


const messageRoute = express.Router()

messageRoute.route("/v1/user/message").post(userAuthenticate, sendMessageByUser)
messageRoute.route("/v1/messages/:id").get(userAuthenticate, getAllMessages)

module.exports = messageRoute