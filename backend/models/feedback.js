const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    Sid: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    month: {
        type: String,
        required: true
    }, 
    year: {
        type: String,
        required: true
    }, 
    response: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    }
});

const Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = Feedback;
