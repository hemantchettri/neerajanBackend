const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../middleware/auth");
const upload = require("../middleware/fileUpload");

const userModel = require("../models/usermodel");
const router = new express.Router();

// router.get("/abcd", function (req, res) {
//   console.log("I am student");

//   var data = new userModel(req.body);
//   data.save();
// });

//login system
router.post("/user/login", function (req, res) {
  //1. we need email id and password
  const email = req.body.email; //variable postman
  const password = req.body.password;

  // 2. check the email in database (customerModel)
  userModel

    .findOne({ email: email }) //model variable
    .then(function (userData) {
      //all data of user is in userDate
      if (userData == null) {
        //if data not found
        return res.status(403).json({ message: "Invalid login" });
      }
      //valid username to check password
      //compare the stored password with given password
      bcrypt.compare(password, userData.password, function (err, result) {
        // console.log(password)
        // console.log(userData.password)
        // console.log(result)
        if (result == false) {
          //if password is incorrect
          return res
            .status(403)
            .json({ message: "Invalid username or password" });
        }
        //username and password is correct
        // now we need to create a token ...
        const token = jwt.sign({ yourID: userData._id }, "anysecretkey");
        res.status(200).json({
          token: token,
          success: true,
          message: "Authorization Success!!!",
        });
      });
    })
    .catch();
});

router.post("/user/register", function (req, res) {
  const username = req.body.username; // fetch from postman body, username must be same with postman
  // console.log(username)
  //const lname = req.body.lname;
  //console.log(lname)
  const email = req.body.email;
  //console.log(email)
  const password = req.body.password;
  //console.log(password)

  bcrypt.hash(password, 10, function (err, hash1) {
    const data = new userModel({
      username: username,
      email: email,
      password: hash1,
    });
    // console.log(data);
    data
      .save()
      .then(function (result) {
        res
          .status(201)
          .json({ message: "Registered successfully", success: true });
      })
      .catch(function (error) {
        res.status(500).json({ message: error });
      });
  });
});

router.put("user/update", function (req, res) {
  // console.log()
  const id = req.body.id;
  const em = req.body.email;
  const pw = req.body.password;
  userModel
    .uploadOne({ _id: id }, { email: em, password: pw })
    .then(function (result) {
      res.status(201).json({ message: "user updated" });
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
});

// router.deleteOne({_id: id})
// .then(function(result){
//     res.status(201).json({message: "User deleted"});

// })
// .catch(function(err){
//     res.status(500).json({message:err})
// })

module.exports = router;
