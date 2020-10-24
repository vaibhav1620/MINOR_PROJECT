const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
        Username: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Password:{
            type:String,
            required: true
        },
        Phone: {
            type: Number,
            required: true
        },
})

const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;
