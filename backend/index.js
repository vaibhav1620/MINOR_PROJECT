const express = require("express");
const app = express();
const path = require("path");
const joi = require("joi");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require("express-session");
const studentModel = require("./models/students");
const teacherModel = require("./models/teachers");
const AppError = require("./public/js/AppError");
const wrapAsync = require("./public/js/wrapAsync");

app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb://localhost:27017/MinorProject', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGO Connection open");
    })
    .catch(err=>{
        console.log("MONGO error");
        console.log(err);
    })

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'notagoodsecret'}));

app.get("/", async function(req,res){
    res.render('index.ejs');
})

app.get("/Student", async function(req,res){
    const students = await studentModel.find({})
    res.render('display.ejs',{Student_details:students});
})

app.get("/Teacher", async function(req,res){
    const teachers = await teacherModel.find({})
    res.render('teacher.ejs',{Teacher_details:teachers});
})

app.get('/Student/:Sid', wrapAsync(async function(req,res,next){
    const sid = req.params.Sid;
    const foundstudent = await studentModel.findOne({Sid:sid});
    if(!foundstudent) {
        throw new AppError('USER DOES NOT EXIST',404);
    }
    res.render('student_index.ejs',{Student_details: foundstudent});
}))

app.get('/Teacher/:Email', wrapAsync(async function(req,res,next){
    const email = req.params.Email;
    const foundteacher = await teacherModel.findOne({Email:email});
    if(!foundteacher) {
        throw new AppError('USER DOES NOT EXIST',404);
    }
    res.render('teacher_index.ejs',{Teacher_details: foundteacher});
}))

app.get('/Student/:Sid/question', async function(req,res){
    const sid = req.params.Sid;
    res.render('question.ejs');
})

app.get("/Signup", async function(req,res){
    res.render('signup.ejs');
})

app.get("/TSignup", async function(req,res){
    res.render('teacher_signup.ejs');
})

app.get("/Login", function(req,res){
    res.render('login.ejs');
})

app.get("/TLogin", function(req,res){
    res.render('teacher_login.ejs');
})

app.post('/Signup',wrapAsync(async function(req,res,next){
        const password = req.body.Password;
        const hash = await bcrypt.hash(password,12);
        req.body.Password = hash;
        const newStudent = new studentModel(req.body);
        await newStudent.save();
        req.session.user_id = newStudent._id;
        res.redirect('/Student/'+newStudent.Sid);
}))

app.post('/TSignup',wrapAsync(async function(req,res){
    const newTeacher =  new teacherModel(req.body);
    const password = req.body.Password;
    const hash = await bcrypt.hash(password,12);
    req.body.Password = hash;
    await newTeacher.save();
    req.session.user_id = newTeacher._id;
    res.redirect('/Teacher/'+newTeacher.Email);
}))

app.post("/Login", wrapAsync(async function(req,res){
    const sid = req.body.Sid;
    const password = req.body.Password;
    const user = await studentModel.findOne({Sid:sid});
    const valid = await bcrypt.compare(password,user.Password);
    if(valid){
        req.session.user_id = user._id;
        res.redirect('/Student/' + user.Sid);
    }
    else {
        res.redirect('/Login');
    }
}))

app.post("/TLogin", wrapAsync(async function(req,res){
    const email = req.body.Email;
    const password = req.body.Password;
    const user = await teacherModel.findOne({Email:email});
    console.log(user);
    const valid = await bcrypt.compare(password,user.Password);
    if(valid){
        req.session.user_id = user._id;
        res.redirect('/Teacher/' + user.Email);
    }
    else {
        res.redirect('/TLogin');
    }
}))

app.use(function(err,req,res,next){
    console.log(err);
    next(err);
})

app.use(function(err,req,res,next){
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    res.status(status).render('error.ejs');
})

app.listen(8080, function(){
    console.log("APP IS LISTENING TO PORT 8080");
});
