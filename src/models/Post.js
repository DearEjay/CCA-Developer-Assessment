const mongoose = require('mongoose');
require('./User');


const PostSchema = new mongoose.Schema({
    postedBy: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Posts', PostSchema);

