const express = require("express")
const { createSurvey, takeSurvey, getResponse } = require("../controllers/surveyController")
const { AuthenticatedUser } = require("../middleware/auth")

const router = express.Router()


router.route("/survey/new").post(AuthenticatedUser, createSurvey) // api for creating new survey

router.route("/takeSurvey/:id").put(AuthenticatedUser, takeSurvey) // api for taking survey

router.route("/getResponse/:id").get(AuthenticatedUser, getResponse) // api for getting response of survey

module.exports = router