const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter survey title"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Question: [Object],
    Response: []
});

module.exports = mongoose.model("Survey", surveySchema);