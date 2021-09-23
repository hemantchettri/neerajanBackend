const mongoose = require("mongoose");

// connection with db called memories

mongoose.connect("mongodb://127.0.0.1:27017/memories", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});
