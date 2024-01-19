const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        requred: true,
        select: false,
    }
})

module.exports = mongoose.model("User", userSchema)