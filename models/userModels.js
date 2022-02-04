const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],// validating email type
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
    }
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10); // for hashing the passowrd
});

userSchema.methods.getJwtToken = function () {   // for creating jwt token
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (password) {  //for comparing password
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);