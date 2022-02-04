const Survey = require("../models/surveyModels")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")

//create survey
exports.createSurvey = catchAsyncError(

    async (req, res, next) => {

        req.body.user = req.user.id // for adding which admin created survey

        const survey = await Survey.create(req.body)
        res.status(200).json({
            success: true,
            survey
        })
    }
)
// taking survey
exports.takeSurvey = catchAsyncError(
    async (req, res, next) => {
        let survey = Survey.findById(req.params.id)
        if (!survey) {
            return next(new ErrorHandler("survey not found", 404))
        }
        response = await Survey.findByIdAndUpdate(req.params.id,
            { $push: { Response: [req.body] } }, //pushing the desired responses in array
            {
                new: true,
                runValidators: true,
                useFindandModifiy: false
            })

        res.status(200).json({
            success: true,
            response
        })
    }
)

//get survey detail
exports.getResponse = catchAsyncError(
    async (req, res, next) => {
        const survey = await Survey.findById(req.params.id)

        if (!survey) {
            return next(new ErrorHandler("survey not found", 404))
        }

        res.status(200).json({
            success: true,
            survey
        })
    }
)