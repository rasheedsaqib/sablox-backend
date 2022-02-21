const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    news: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Constant', postSchema);