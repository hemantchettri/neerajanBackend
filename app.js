const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const memoriesRoute = require("./routes/memoriesRoute");
const adminRoute = require("./routes/adminRoute");
const mongoose = require("mongoose");
require("./dbConnection/db");

const cors = require("cors");

const app = express();
app.use(cors());

const path = require("path");

const publicDir = path.join(__dirname, "blogs");
app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const userRoute = require('./router/userRoute')
//app.use(userRoute);

// app.use(userModel)
app.use(adminRoute);
app.use(memoriesRoute);
app.use(userRoute);

app.listen(90);
