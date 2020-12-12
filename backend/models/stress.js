const mongoose = require('mongoose');

const stressSchema = new mongoose.Schema({
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

const Stress = mongoose.model('Stress',stressSchema);
module.exports = Stress;
