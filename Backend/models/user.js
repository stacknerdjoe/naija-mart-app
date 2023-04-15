const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: string,
        trim: true,
        required: true
    },
    email: {
        type: string,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: string,
        required: true,
    }
})

module.exports = mongoose.model("User", userSchema)