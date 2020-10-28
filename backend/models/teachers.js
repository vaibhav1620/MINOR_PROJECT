const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
        username:{
            type: String,
            required: true,
            unique: true
        },
        Password:{
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Phone: {
            type: Number,
            required: true
        },
})

const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;
