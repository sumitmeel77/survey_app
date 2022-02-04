const download = require('image-downloader');
const path = require('path');
var file = require('file-system');
const resizeImg = require('resize-img');
const catchAsyncError = require("../middleware/catchAsyncError")

exports.imageTG = catchAsyncError(
    (req, res, next) => {
        let ext = path.extname(req.body.url); //extension of image file
        const options = {
            url: req.body.url,
            dest: './images'    // destination pth of downloaded image
        };
        if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
            download.image(options)
                .then(({ filename }) => {
                    resizeImg(
                        file.readFileSync(filename),
                        { width: 50, height: 50 }
                    ).then(buf => {
                        let fName = filename.split("\\");
                        let finalName = fName.pop();
                        file.writeFileSync("./images/thumbnails/" + finalName, buf); // storing thumbnail in the given folder
                        res.json({
                            message: "Successfully saved in image folder"
                        });
                        next();
                    })
                })
        } else {
            res.status(403);
            res.json({
                Message: "error"
            })
        }
    });