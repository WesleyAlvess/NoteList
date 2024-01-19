const mongoose = require("mongoose")

const connectDatabase = () => {
    console.log("Wait connecting to mongoDb");

    mongoose.connect("mongodb://localhost:27017")
        .then(() => console.log("MongoDb connected"))
        .catch((err) => console.log({ message: err.message }))
}

module.exports = connectDatabase