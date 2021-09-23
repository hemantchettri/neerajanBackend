const express = require("express");
const adminmodel = require("../models/adminmodel");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const jwt = require("jsonwebtoken");

//login system
router.post("/admin/login", function (req, res) {
  //1. we need email id and password
  const email = req.body.email; //variable postman
  const password = req.body.password;

  adminmodel
    .findOne({ email: email }) //model variable
    .then(function (adminData) {
      if (adminData == null) {
        //if data not found
        return res.status(403).json({ message: "Invalid login" });
      }

      bcrypt.compare(password, adminData.password, function (err, result) {
        if (result == false) {
          return res
            .status(403)
            .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ yourID: adminData._id }, "anysecretkey");
        res.status(200).json({
          token: token,
          success: true,
          message: "Authorization Success!!!",
        });
      });
    })
    .catch();
});

router.post("/admin/register", function (req, res) {
  const username = req.body.username; // fetch from postman body, username must be same with postman

  const email = req.body.email;
  //console.log(email)

  const password = req.body.password;

  //console.log(password)

  bcrypt.hash(password, 10, function (err, hash1) {
    const data = new adminmodel({
      email: email,
      password: hash1,
    });
    console.log(data);
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

router.put("/admin/update", function (req, res) {
  const id = req.body.id;
  const name = req.body.name;
  Admin.updateOne({ _id: id }, { name: name })
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      res.status(500).json({ message: error });
    });
});

// router.delete("/admin/delete", function (req, res) {
//   const id = req.body.id;
//   Admin.deleteOne({ _id: id })
//     .then(function (result) {
//       res.status(201).json({ message: "post deleted" });
//     })
//     .catch(function (err) {
//       res.status(500).json({ message: err });
//     });
// });

module.exports = router;
