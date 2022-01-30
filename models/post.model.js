const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    image: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
        default: []
    }]
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);