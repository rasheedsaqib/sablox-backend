const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);