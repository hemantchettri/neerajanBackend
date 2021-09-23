const mongoose = require("mongoose");
const memoriesSchema = new mongoose.Schema({
    title: {
        type: String,
    },

    postimage: {
        type: String,
    },

    postdescription: {
        type: String,
    },
});

const memories = mongoose.model("memories", memoriesSchema);

module.exports = memories;
