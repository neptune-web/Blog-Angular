const mongoose = require('mongoose');
const comment = require('../model/commentSchema');

const blogSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true
    },
    authorDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    tags: [String],
    comments: [comment],
    postedAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});
module.exports = mongoose.model('blog', blogSchema);