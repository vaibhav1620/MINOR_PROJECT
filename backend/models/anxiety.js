const mongoose = require('mongoose');

const anxietySchema = new mongoose.Schema({
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
        type: [String],
        required: true,
        default: ['op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0']
    }
});

const Anxiety = mongoose.model('Anxiety',anxietySchema);
module.exports = Anxiety;
