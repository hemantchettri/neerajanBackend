// creating table for users
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid Email Address.",
    ],
  },
  password: {
    type: String,
  },
});

// table name is user
const Users = mongoose.model("User", userSchema);
module.exports = Users;
