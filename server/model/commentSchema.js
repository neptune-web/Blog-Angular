const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        ref: 'users'
    },
    comment: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300,
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = commentSchema;