/* eslint-disable prettier/prettier */
const express = require('express')
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const cors = require("cors")
const jwt = require("jsonwebtoken")

// locally imported
const User = require("./models/user")
const Message = require("./models/message")


const app = express()
const port = 3000

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())
app.use(passport.initialize())


mongoose.connect(
    "mongodb+srv://admin:12345@cluster0.5xjjknh.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

app.listen(port, () => {
    console.log("Server running on port", port)
}) 


// endpoints 
app.post('/register', (req, res) => {
    const {name, email, password, image} = req.body
    const newUser = new User({
        name,
        email,
        image,
        password
    })
    newUser.save().then(() => {
        res.status(200).json("User registerd Successfully")
    }).catch((err) => {
        console.log('error == ', err.message)
        res.status(500).json(err.message)
    })
})

//function to create a token for the user
const createToken = (userId) => {
    // Set the token payload
    const payload = {
      userId: userId,
    };
  
    // Generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  
    return token;
  };

app.post("/login", (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(404).json("Email and Password are required")
    }

    User.findOne({email}).then((user) => {
        if(!user) {
            return res.status(400).json("User not found!")
        }

        // compare the provided password with the password
        if(user.password !== password) {
            return res.status(404).json("Invalid Password!")
        }

        const token = createToken(user._id)
        res.status(200).json({
            userId: user._id,
            token,
          });
    }).catch((error) => {
        console.log("Error in finding the user ", error)
        res.status(500).json("Internal server Error!!")
    })
})

// endpoint to access all the users except the user who is currently logged in
app.get("/users/:userId", (req, res) => {
    const loggedInUserId = req.params.userId

    User.find({_id:{$ne: loggedInUserId}}).then((users) => {
        res.status(200).json(users)
    }).catch((err) => {
        console.log("Error retrieving users", err)
        res.status(500).json("Error retrieving users")
    })
})