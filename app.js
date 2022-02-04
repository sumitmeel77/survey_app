const express = require("express")
const errorHandler = require("./middleware/error")
const cookieParser = require("cookie-parser")


const app = express()
app.use(express.json())

var cors = require('cors')

app.use(cors())

app.use(cookieParser())
//importing routes

const user = require("./routers/userRoute")
app.use("/api", user)

const survey = require("./routers/surveyRoute")
app.use("/api", survey)

const image = require("./routers/imageRoute")
app.use("/api", image)

// middleware for error
app.use(errorHandler)

module.exports = app