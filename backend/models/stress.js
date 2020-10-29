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
    response: {
        type: [String],
        required: true,
        default: ['op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0', 'op0']
    }
});

const Stress = mongoose.model('Stress',stressSchema);
module.exports = Stress;
