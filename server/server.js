import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Schema
import User from "./Schema/User.js";

const server = express();
let PORT = process.env.PORT || 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json()); // for parsing application/json

mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true, // Don't build indexes
});

const formatDataToSend = (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: "1d" }
  );
  return {
    accessToken,
    profile_img: user.personal_info.profile_img,
    fullname: user.personal_info.fullname,
    username: user.personal_info.username,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let user = await User.findOne({ "personal_info.username": username });

  if (user) {
    username = username + Math.floor(Math.random() * 1000);
  }

  return username;
};

server.post("/signup", (req, res) => {
  //1. getting data from the request
  let { fullname, email, password } = req.body;

  //2. validating the data
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ message: "Fullname should be atleast 3 characters" });
  }
  if (!email.length) {
    return res.status(403).json({ message: "Please enter a valid email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ message: "Email is invalid." });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      message:
        "Password should be atleast 6 characters (1 lowercase, 1 uppercase, 1 numeric value and 1 special character).",
    });
  }

  //3. hashing the password
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    password = hash;

    let username = await generateUsername(email);

    let user = new User({
      personal_info: {
        fullname,
        email,
        password,
        username,
      },
    });

    user
      .save()
      .then((data) => {
        return res.status(200).json(formatDataToSend(data));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(403).json({ message: "Email already exists." });
        }

        return res.status(500).json({ message: err.message });
      });
  });

  //   signup

  //   return res.status(200).json({ message: "Signup successful" });
});

// signin
server.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email })
    .then((user) => {
      console.log(user);

      //1. if user-email is not found
      if (!user) {
        return res.status(403).json({ message: "Invalid email" });
      }

      //2. if user-email is found
      //3. compare the password
      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        // 3.1 if error in comparing password
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        //3.2 if password is incorrect
        if (!result) {
          return res.status(403).json({ message: "Invalid password" });
        }

        //3.3 if password is correct, send the user document
        return res.status(200).json(formatDataToSend(user));
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

server.listen(PORT, () => {
  console.log(`Server is running on port -> ${PORT}`);
});
