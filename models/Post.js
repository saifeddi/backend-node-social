const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{
        text: String,
        date: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
