

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    videoFile: {
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('video',videoSchema);