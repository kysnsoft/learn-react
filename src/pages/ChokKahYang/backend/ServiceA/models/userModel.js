const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        trim: true
    },
    psw: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    isLogged: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User