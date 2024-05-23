const express = require("express");
const User = require("../Modals/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const router = express.Router();

// function to generate random string
const randString = () => {
  const len = 8; //considering a 8 length string
  let randStr = "";

  for (let i = 0; i < len; i++) {
    //ch = a number between 1 tp 10
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};

// function to send email
const sendEmail = async (email, uniqueString) => {
  var Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "",
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions;
  let sender = process.env.NODEMAILER_EMAIL;
  console.log(email, uniqueString);

  mailOptions = {
    from: sender,
    to: email,
    subject: "Email confirmation",
    //html: "<b>Hello world ✔</b>"
    html: `Press <a href=http://localhost:5173/verify/${uniqueString}> Here </a> to verify your email. Thanks`,
  };

  try {
    await Transport.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const uniqueString = randString();
    const isValid = false;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      isValid,
      uniqueString,
    });

    // Save the user to the database
    user
      .save()
      .then(() => {
        console.log("User Added Successfully");
        res.status(200).json({ sucess: true, message: "Signup successful" }); // Send a response with status code 200 and a message
      })
      .catch((error) => {
        console.log("Failed to add user:::::", error);
      });

    //function to send email to given user
    //sendEmail(email, uniqueString);
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
});

module.exports = router;
