const mongoose = require('mongoose');
const studentModel = require("./models/students");
const teacherModel = require("./models/teachers");
mongoose.connect('mongodb://localhost:27017/MinorProject', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGO Connection open");
    })
    .catch(err=>{
        console.log("MONGO error");
        console.log(err);
    })

const s = new studentModel({
    Username: "Vaibhav",
    Email: "123@gmail.com",
    Password: "12345678",
    Phone: 9466636627,
    Sid: 18103047,
    Guardian_name: "adsdsaddas",
    Guardian_phone: 000000000,
})

s.save().then(s=> {
    console.log(s);
})
.catch(err=>{
    console.log(err);
});

// const seedStudents = [
//     {
//         Username: "Vaibhav",
//         Email: "123@gmail.com",
//         Phone: 9466636627,
//         Sid: 18103047
//     },
//     {
//         Username: "Akshit",
//         Email: "1234@gmail.com",
//         Phone: 9466626617,
//         Sid: 18103046
//     },
//     {
//         Username: "Sahil",
//         Email: "12345@gmail.com",
//         Phone: 9116636627,
//         Sid: 18103041
//     },
//     {
//         Username: "Akshat",
//         Email: "123456@gmail.com",
//         Phone: 9461116627,
//         Sid: 18103008
//     },
// ]
//
// const seedTeachers = [
//     {
//         Username: "Rajesh Bhatia",
//         Email: "123@gmail.com",
//         Phone: 9466636627
//     },
//     {
//         Username: "Manish",
//         Email: "1234@gmail.com",
//         Phone: 9466626617
//     },
//     {
//         Username: "Poonam",
//         Email: "12345@gmail.com",
//         Phone: 9116636627
//     },
// ]
//
//  studentModel.insertMany(seedStudents);
//  teacherModel.insertMany(seedTeachers);
