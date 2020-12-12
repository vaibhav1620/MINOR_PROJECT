const mongoose = require('mongoose');

const depressionSchema = new mongoose.Schema({
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
    response_mcq: {
        type: [String],
        required: true,
        default: ['op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0']
    },
    response_text: {
        type: [String],
        required: true,
        default: ["", "", ""]
    },
    value_text: {
        type: [Number],
        required: true
    }
});

const Depression = mongoose.model('Depression',depressionSchema);
module.exports = Depression;
