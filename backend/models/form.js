const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    op0: {
        type: String,
        required: true,
        enum: ['Never', 'Sometimes', 'Often', 'Almost Always']
    },    
    op1: {
        type: String,
        required: true,
        enum: ['Never', 'Sometimes', 'Often', 'Almost Always']
    },
    op2: {
        type: String,
        required: true,
        enum: ['Never', 'Sometimes', 'Often', 'Almost Always']
    },
    op3: {
        type: String,
        required: true,
        enum: ['Never', 'Sometimes', 'Often', 'Almost Always']
    },
    category: {
        type: String,
        required: true,
        enum: ['d', 'a', 's']
    }
});

const Form = mongoose.model('Form',formSchema);
module.exports = Form;
