const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require("express-session");

app.use(express.static(path.join(__dirname,'public')));
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

app.get('/Student/:Sid', async function(req,res){
    const sid = req.params.Sid;
    const foundstudent = await studentModel.findOne({Sid:sid});
    console.log(sid);
    res.render('student_index.ejs',{Student_details: foundstudent});
})

app.get('/Teacher/:Email', async function(req,res){
    const email = req.params.Email;
    const foundteacher = await teacherModel.findOne({Email:email});
    console.log(email);
    res.render('teacher_index.ejs',{Teacher_details: foundteacher});
})

app.get('/Student/:Sid/question', async function(req,res){
    const sid = req.params.Sid;
    console.log(sid);
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

app.post('/Student',async function(req,res){
    const password = req.body.Password;
    const hash = await bcrypt.hash(password,12);
    req.body.Password = hash;
    const newStudent =  new studentModel(req.body);
    await newStudent.save();
    req.session.user_id = newStudent._id;
    res.redirect('/Student/'+newStudent.Sid);
})

app.post('/TSignup',async function(req,res){
    const password = req.body.Password;
    const hash = await bcrypt.hash(password,12);
    req.body.Password = hash;
    const newTeacher =  new teacherModel(req.body);
    await newTeacher.save();
    req.session.user_id = newTeacher._id;
    res.redirect('/Teacher/'+newTeacher.Email);
})

app.post("/Login", async function(req,res){
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
})

app.post("/TLogin", async function(req,res){
    console.log(req.body);
    const email = req.body.Email;
    const password = req.body.Password;
    const user = await teacherModel.findOne({Email:email});
    const valid = await bcrypt.compare(password,user.Password);
    if(valid){
        req.session.user_id = user._id;
        res.redirect('/Teacher/' + user.Email);
    }
    else {
        res.redirect('/TLogin');
    }
})

app.listen(8080, function(){
    console.log("APP IS LISTENING TO PORT 8080");
});
