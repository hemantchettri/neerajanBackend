const jwt = require("jsonwebtoken");
const Users = require("../models/usermodel");

module.exports.verifyuser = function (req, res, next) {
  console.log("hello");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "tokenforauthentication");

    Users.findOne({ _id: data._id })
      .then(function (result) {
        req.userData = result;
        next();
      })
      .catch(function (error) {
        res.status(401).json({ error: "error" });
      });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

// module.exports.verifyAdmin = function (req, res, next) {
//   if (!req.userData) {
//     return res.status(401).json({ message: "Unauthorized!!" });
//   } else if (req.userData.userType !== "Admin") {
//     return res.status(401).json({ message: "Unauthorized!!" });
//   }
// };
