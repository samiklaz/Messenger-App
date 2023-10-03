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
app.get("/users/:userId", async (req, res) => {
    try {
        const loggedInUserId = req.params.userId;
        
        // Find the logged-in user
        const loggedInUser = await User.findById(loggedInUserId);
        console.log("loggged in user === ", loggedInUser.friends)

        if (!loggedInUser) {
            return res.status(404).json("User not found");
        }

        // Find users who are not friends of the logged-in user
        const users = await User.find({
            $and: [
                { _id: { $ne: loggedInUserId } },  // Exclude the logged-in user
                { _id: { $nin: loggedInUser.friends } }, // Exclude friends
                { _id: { $nin: loggedInUser.sentFriendRequests } } // Exclude users with pending friend requests
            ]
        });

        res.status(200).json(users);
    } catch (err) {
        console.error("Error retrieving users", err);
        res.status(500).json("Error retrieving users");
    }
});


// endpoint to send a request to a user
app.post('/friend-request', async(req, res) => {
    const {currentUserId, selectedUserId} = req.body
    try {
        // update the recipient's friendRequests
        await User.findByIdAndUpdate(selectedUserId, {
            $addToSet: { friendRequests: currentUserId}
        })


        // update the sender's sentFriendRequests
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: {sentFriendRequests: selectedUserId}
        })

        res.sendStatus(200)
    } catch(error) {
        res.sendStatus(500)
    }
})


// endpoint to show all the friend request of a particular user
app.get("/friend-request/:userId", async (req, res) => {
    try {
        const {userId} = req.params

        const user = await User.findById(userId).populate("friendRequests", "name email image").lean()

        const friendRequests = user.friendRequests
        res.status(200).json(friendRequests)
    } catch(error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})


// endpoint to accept a request of a particular person
app.post("/friend-request/accept", async (req, res) => {
    try {
        const {senderId, recipientId} = req.body

        // retrieve the documents of sender and the recipient
        const sender = await User.findById(senderId)
        const recipient = await User.findById(recipientId)

        if (!sender.friends.includes(recipientId)) {
            sender.friends.push(recipientId);
        }
        if (!recipient.friends.includes(senderId)) {
            recipient.friends.push(senderId);
        }

        recipient.friendRequests = recipient.friendRequests.filter(
            (request) => request.toString() !== senderId.toString()
        )

        sender.sentFriendRequests = sender.sentFriendRequests.filter(
            (request) => request.toString() !== recipientId.toString()
        )

        await sender.save()
        await recipient.save()

        res.status(200).json("Friend Request accepted successfully")
    } catch(error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }  
})


// endpoint to access all the friends of the logged in user
app.get("/accepted-friends/:userId", async (req, res) => {
    try {
        const {userId} = req.params
        const user = await User.findById(userId).populate(
            "friends",
            "name email image"
        )

        console.log("user friends == ", user.friends)

        const acceptedFriends = user.friends
        res.status(200).json(acceptedFriends)
    } catch(error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})