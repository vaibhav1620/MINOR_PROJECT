const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
        Sid:{
            type: String,
            required: true
        },
        Guardian_name: {
            type: String,
            required: true
        },
        Guardian_phone: {
            type: Number,
            required: true
        },
        Branch:{
            type:String,
            required: true,
            lowercase: true,
            enum: ['aerospace','civil','computerscience','electrical','electronics','mechanical','mettalurgical','production']
        }
})

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;
