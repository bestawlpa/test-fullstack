const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    verifyCode: { type: String },
    verifyCodeExpiration: { type: Number },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)