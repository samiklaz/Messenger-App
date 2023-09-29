/* eslint-disable prettier/prettier */
const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    messageTypes: {
        type: String,
        enum: ["text", "image"],
    },
    message: String,
    imageUrl: String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message