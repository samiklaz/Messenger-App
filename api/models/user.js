/* eslint-disable prettier/prettier */

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        reuired: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    ],
    sentFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        }
    ]
})


const User = mongoose.model("User", userSchema)

module.exports = User
