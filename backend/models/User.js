const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const UserSchema = new Schema({
    // name: String,
    name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = Mongoose.model('user', UserSchema)
module.exports = User;
