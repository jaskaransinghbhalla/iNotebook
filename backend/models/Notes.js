const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const NotesSchema = new Mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Mongoose.model('notes', NotesSchema)
