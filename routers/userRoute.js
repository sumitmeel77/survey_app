const express = require("express")
const { registerUser, loginUser, logoutUser } = require("../controllers/userController")

const router = express.Router()

router.route("/user/register").post(registerUser) // api for registering new User

router.route("/user/login").post(loginUser) // api for login user

router.route("/user/logout").get(logoutUser) // api for logout user


module.exports = router