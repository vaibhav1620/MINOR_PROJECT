const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['d', 'a', 's']
    },
    variant : {
        type: String,
        required: true,
        enum: ['mcq', 'text'],
        default: 'mcq'
    }
});

const Form = mongoose.model('Form',formSchema);
module.exports = Form;
