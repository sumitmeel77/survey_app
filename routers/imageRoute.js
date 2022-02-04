const express = require("express")
const { imageTG } = require("../controllers/ImageController")
const { AuthenticatedUser } = require("../middleware/auth")

const router = express.Router()


router.route("/imageTG").post(AuthenticatedUser, imageTG)

module.exports = router