
const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: [true, "please enter your name !"]
        },
        id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, "please enter your email id ! "]
        },
    },
    seller: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, "please enter your email id ! "]
        }
    },
    messages: [
        {
            message: {
                type: String,
                required: [true, "please enter your message"]
            },
            by:{
                type : String,
                required : true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]

})

const Message = new mongoose.model("message", messageSchema)

module.exports = Message