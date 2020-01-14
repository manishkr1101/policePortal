const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    imgUrl: {
        type: String,
        default: 'images/profile.png'
    },
    admin: {
        type: Number,
        default: 0
    },
    psid: String
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = new mongoose.model('User', userSchema)

module.exports = User;