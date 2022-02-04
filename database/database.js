const mongoose = require("mongoose")

// connecting with moongoose database
const connectDatabase = () => {
    mongoose.connect(process.env.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("connection successfull with database") })
}


module.exports = connectDatabase