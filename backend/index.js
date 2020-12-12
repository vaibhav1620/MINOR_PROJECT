const express = require("express");
const app = express();
const path = require("path");
const joi = require("joi");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require("express-session");
const methodOverride = require('method-override');
const flash = require('connect-flash');
const Chart = require('chart.js');
const http = require('http');
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const studentModel = require("./models/students");
const teacherModel = require("./models/teachers");
const formModel = require("./models/form");
const stressModel = require("./models/stress");
const anxietyModel = require("./models/anxiety");
const depressionModel = require("./models/depression");
const feedbackModel = require("./models/feedback");

const AppError = require("./public/js/AppError");
const wrapAsync = require("./public/js/wrapAsync");

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/MinorProject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO Connection open");
    })
    .catch(err => {
        console.log("MONGO error");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = req.flash('success');
    next();
})

app.get("/", async function (req, res) {
    res.render('index.ejs');
})

app.get("/flash", async function (req, res) {
    req.flash('success', 'welcome to HIM');
    res.render('error.ejs');
})

app.get("/Student", async function (req, res) {
    const students = await studentModel.find({})
    res.render('display.ejs', { Student_details: students });
})

app.get("/Teacher", async function (req, res) {
    const teachers = await teacherModel.find({})
    res.render('teacher.ejs', { Teacher_details: teachers });
})

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();

function compare1(a, b) {
    const sid1 = a.Sid;
    const sid2 = b.Sid;

    let comparison = 0;
    if (sid1 > sid2) {
        comparison = 1;
    } else if (sid1 < sid2) {
        comparison = -1;
    }
    return comparison;
}

app.get("/Teacher/:Email/:Branch", wrapAsync(async function (req, res, next) {
    const branch = req.params.Branch;
    const wholeBranch = await studentModel.find({ Branch: branch });
    const link = "/Teacher/" + req.params.Email + "/" + req.params.Branch;
    const link1 = "/Teacher/" + req.params.Email;
    const email = req.params.Email;
    const foundteacher = await teacherModel.findOne({ Email: email });
    wholeBranch.sort(compare1);
    res.render('branch.ejs', { Branch: wholeBranch, heading: branch, link: link, link1: link1, Teacher_details: foundteacher });
}))

app.get("/Teacher/:Email/:Branch/:Sid", wrapAsync(async function (req, res, next) {
    const sid = req.params.Sid;
    const form1 = await stressModel.find({ Sid: sid });
    const form2 = await anxietyModel.find({ Sid: sid });
    const form3 = await depressionModel.find({ Sid: sid });
    const feed = await feedbackModel.find({ Sid: sid, month: months[d.getMonth()], year: d.getFullYear() });
    const yearform1 = await stressModel.find({ Sid: sid, year: d.getFullYear() });
    const yearform2 = await anxietyModel.find({ Sid: sid, year: d.getFullYear() });
    const yearform3 = await depressionModel.find({ Sid: sid, year: d.getFullYear() });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const link = "/Teacher/" + req.params.Email + "/" + req.params.Branch + "/" + req.params.Sid;
    const link1 = "/Teacher/" + req.params.Email + "/" + req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    if (form1.length === 0) {
        throw new AppError('USER HAS NOT FILLED AY FORM YET', 404);
    }
    res.render('studentResponses.ejs', { Form1: form1, Form2: form2, Form3: form3, Student_details: foundstudent, Teacher_details: foundteacher, Sid: sid, link: link, link1, yearform1, yearform2, yearform3, feed: feed });
}))

app.get("/Teacher/:Email/:Branch/:Sid/responseStress", wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const form = await stressModel.find({ Sid: sid });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const branch = req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    const questions = await formModel.find({ category: 's' });
    res.render("responseStress.ejs", { form: form, Student_details: foundstudent, Teacher_details: foundteacher, heading: "Form 1", questions, sid, email, branch });
}))

app.get("/Teacher/:Email/:Branch/:Sid/responseAnxiety", wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const form = await anxietyModel.find({ Sid: sid });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const branch = req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    const questions = await formModel.find({ category: 'a' });
    res.render("responseAnxiety.ejs", { form: form, Student_details: foundstudent, Teacher_details: foundteacher, heading: "Form 2", questions, sid, email, branch });
}))

app.get("/Teacher/:Email/:Branch/:Sid/responseDepression", wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const form = await depressionModel.find({ Sid: sid });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const branch = req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    const questions = await formModel.find({ category: 'd' });
    res.render("responseDepression.ejs", { form: form, Student_details: foundstudent, Teacher_details: foundteacher, heading: "Form 3", questions, sid, email, branch });
}))

app.get("/Teacher/:Email/:Branch/:Sid/:id/responseStress", wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const id = req.params.id;
    const form = await stressModel.find({ Sid: sid, id: id });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const branch = req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    const questions = await formModel.find({ category: 's' });
    res.render("responseStress1.ejs", { form: form, Student_details: foundstudent, Teacher_details: foundteacher, heading: "Form 1", questions, sid, email, branch, id });
}))

app.get("/Teacher/:Email/:Branch/:Sid/:id/responseAnxiety", wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const id = req.params.id;
    const form = await anxietyModel.find({ Sid: sid, id: id });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const branch = req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    const questions = await formModel.find({ category: 'a' });
    res.render("responseAnxiety1.ejs", { form: form, Student_details: foundstudent, Teacher_details: foundteacher, heading: "Form 2", questions, sid, email, branch, id });
}))

app.get("/Teacher/:Email/:Branch/:Sid/:id/responseDepression", wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const id = req.params.id;
    const form = await depressionModel.find({ Sid: sid, id: id });
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const email = req.params.Email;
    const branch = req.params.Branch;
    const foundteacher = await teacherModel.findOne({ Email: email });
    const questions = await formModel.find({ category: 'd' });
    res.render("responseDepression1.ejs", { form: form, Student_details: foundstudent, Teacher_details: foundteacher, heading: "Form 3", questions, sid, email, branch, id });
}))

app.get('/Student/:Sid', wrapAsync(async function (req, res, next) {
    const sid = req.params.Sid;
    const foundstudent = await studentModel.findOne({ Sid: sid });
    if (!foundstudent) {
        throw new AppError('USER DOES NOT EXIST', 404);
    }
    res.render('student_index.ejs', { Student_details: foundstudent });
}))

app.get('/Teacher/:Email', wrapAsync(async function (req, res, next) {
    const email = req.params.Email;
    const foundteacher = await teacherModel.findOne({ Email: email });
    if (!foundteacher) {
        throw new AppError('USER DOES NOT EXIST', 404);
    }
    const link = "/Teacher/" + req.params.Email;
    res.render('teacher_index.ejs', { Teacher_details: foundteacher, link: link });
}))


app.get('/Student/:Sid/formstress', wrapAsync(async function (req, res, next) {
    const sid = req.params.Sid;
    // console.log(sid);
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const questions_mcq = await formModel.find({ category: 's', variant: 'mcq' });
    const questions_text = await formModel.find({ category: 's', variant: 'text' });
    res.render('question.ejs', { questions_text, questions_mcq, heading: "Form 1", sid, Student_details: foundstudent });
}))

app.post('/Student/:Sid/formstress', wrapAsync(async function (req, res, next) {
    const sid = req.params.Sid;
    const obj = req.body;
    var mcq = [];
    var text = [];
    mcq.push(obj.ques1);
    mcq.push(obj.ques2);
    mcq.push(obj.ques3);
    mcq.push(obj.ques4);
    mcq.push(obj.ques5);
    mcq.push(obj.ques6);
    mcq.push(obj.ques7);
    mcq.push(obj.ques8);

    text.push(obj.text0);
    text.push(obj.text1);
    text.push(obj.text2);

    var value_array = [];
    for (let i = 0; i < text.length; i++) {
        value_array.push(NLP(text[i]));
    }

    const id = sid + months[d.getMonth()] + d.getFullYear();
    const check = await stressModel.findOne({ id: id });
    if (check) {
        throw new AppError('Form for this month is already filled');
    }
    const user = new stressModel({ Sid: sid, id: id, month: months[d.getMonth()], year: d.getFullYear(), response_mcq: mcq, response_text: text, value_text: value_array });
    await user.save();
    // console.log(typeof value_array);
    res.redirect("/Student/" + sid + "/formanxiety");
}))

app.get('/Student/:Sid/formanxiety', wrapAsync(async function (req, res, next) {
    const sid = req.params.Sid;
    // console.log(sid);
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const questions_mcq = await formModel.find({ category: 'a', variant: 'mcq' });
    const questions_text = await formModel.find({ category: 'a', variant: 'text' });
    res.render('question.ejs', { questions_text, questions_mcq, heading: "Form 2", sid, Student_details: foundstudent });
}))

app.post('/Student/:Sid/formanxiety', wrapAsync(async function (req, res, next) {
    const sid = req.params.Sid;
    const obj = req.body;
    var mcq = [];
    var text = [];
    mcq.push(obj.ques1);
    mcq.push(obj.ques2);
    mcq.push(obj.ques3);
    mcq.push(obj.ques4);
    mcq.push(obj.ques5);
    mcq.push(obj.ques6);
    mcq.push(obj.ques7);
    mcq.push(obj.ques8);

    text.push(obj.text0);
    text.push(obj.text1);
    text.push(obj.text2);

    var value_array = [];
    for (let i = 0; i < text.length; i++) {
        value_array.push(NLP(text[i]));
    }

    const id = sid + months[d.getMonth()] + d.getFullYear();
    const check = await anxietyModel.findOne({ id: id });
    if (check) {
        throw new AppError('Form for this month is already filled');
    }
    const user = new anxietyModel({ Sid: sid, id: id, month: months[d.getMonth()], year: d.getFullYear(), response_mcq: mcq, response_text: text, value_text: value_array });
    await user.save();
    res.redirect("/Student/" + sid + "/formdepression");
}))

app.get('/Student/:Sid/formdepression', wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    // console.log(sid);
    const foundstudent = await studentModel.findOne({ Sid: sid });
    const questions_mcq = await formModel.find({ category: 'd', variant: 'mcq' });
    const questions_text = await formModel.find({ category: 'd', variant: 'text' });
    res.render('question.ejs', { questions_text, questions_mcq, heading: "Form 3", sid, Student_details: foundstudent });
}))

app.post('/Student/:Sid/formdepression', wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const obj = req.body;
    var mcq = [];
    var text = [];
    mcq.push(obj.ques1);
    mcq.push(obj.ques2);
    mcq.push(obj.ques3);
    mcq.push(obj.ques4);
    mcq.push(obj.ques5);
    mcq.push(obj.ques6);
    mcq.push(obj.ques7);
    mcq.push(obj.ques8);

    text.push(obj.text0);
    text.push(obj.text1);
    text.push(obj.text2);

    var value_array = [];
    for (let i = 0; i < text.length; i++) {
        value_array.push(NLP(text[i]));
    }

    const id = sid + months[d.getMonth()] + d.getFullYear();
    const check = await depressionModel.findOne({ id: id });
    if (check) {
        throw new AppError('Form for this month is already filled');
    }
    const user = new depressionModel({ Sid: sid, id: id, month: months[d.getMonth()], year: d.getFullYear(), response_mcq: mcq, response_text: text, value_text: value_array });
    await user.save();
    res.redirect("/Student/" + sid + "/feedback");
}))

app.get('/Student/:Sid/feedback', wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const foundstudent = await studentModel.findOne({ Sid: sid });
    res.render('feedback.ejs', { heading: "Feedback", sid, Student_details: foundstudent });
}))

function NLP(q) {
    const lexedReview = aposToLexForm(q);

    // casing
    const casedReview = lexedReview.toLowerCase();

    // removing
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

    // tokenize review
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

    // spell correction
    tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word);
    })

    // remove stopwords
    const filteredReview = SW.removeStopwords(tokenizedReview);

    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

    const analysis = analyzer.getSentiment(filteredReview);
    return analysis;
}

app.post('/Student/:Sid/feedback', wrapAsync(async function (req, res) {
    const sid = req.params.Sid;
    const obj = req.body;
    // console.log(obj);
    const id = sid + months[d.getMonth()] + d.getFullYear();
    const check = await feedbackModel.findOne({ id: id });
    if (check) {
        throw new AppError('Form for this month is already filled');
    }
    // console.log(obj);
    var q = obj.feed;

    const analysis = NLP(q);

    const feed = new feedbackModel({ Sid: sid, id: id, month: months[d.getMonth()], year: d.getFullYear(), response: obj.feed, num: analysis });
    await feed.save();
    res.redirect("/Student/" + sid + "/");
}))

app.get("/Signup", async function (req, res) {
    res.render('signup.ejs');
})

app.get("/TSignup", async function (req, res) {
    res.render('teacher_signup.ejs');
})

app.get("/Login", function (req, res) {
    res.render('login.ejs');
})

app.get("/TLogin", function (req, res) {
    res.render('teacher_login.ejs');
})

app.post('/Signup', wrapAsync(async function (req, res, next) {
    const password = req.body.Password;
    const hash = await bcrypt.hash(password, 12);
    req.body.Password = hash;
    const newStudent = new studentModel(req.body);
    await newStudent.save();
    req.session.user_id = newStudent._id;
    res.redirect('/Student/' + newStudent.Sid);
}))

app.post('/TSignup', wrapAsync(async function (req, res, next) {
    const password = req.body.Password;
    const hash = await bcrypt.hash(password, 12);
    req.body.Password = hash;
    const tid = req.body.Tid;
    if (tid < 3000 || tid > 10000) {
        throw new AppError('Professor validation failed! Check your Details');
    }
    const newTeacher = new teacherModel(req.body);
    await newTeacher.save();
    if (!newTeacher) {
        throw new AppError('Professor validation failed! Check your Details');
    }
    req.session.user_id = newTeacher._id;
    res.redirect('/Teacher/' + newTeacher.Email);
}))

app.post("/Login", wrapAsync(async function (req, res) {
    const sid = req.body.Sid;
    const password = req.body.Password;
    const user = await studentModel.findOne({ Sid: sid });
    if (!user) {
        throw new AppError('USER DOES NOT EXIST CHECK YOUR CREDENTIALS');
    }
    const valid = await bcrypt.compare(password, user.Password);
    if (valid) {
        req.session.user_id = user._id;
        res.redirect('/Student/' + user.Sid);
    }
    else {
        res.redirect('/Login');
    }
}))

app.post("/TLogin", wrapAsync(async function (req, res, next) {
    const email = req.body.Email;
    const password = req.body.Password;
    const user = await teacherModel.findOne({ Email: email })
    if (!user) {
        throw new AppError('USER DOES NOT EXIST CHECK YOUR CREDENTIALS');
    }
    const valid = await bcrypt.compare(password, user.Password);
    if (valid) {
        req.session.user_id = user._id;
        res.redirect('/Teacher/' + user.Email);
    }
    else {
        res.redirect('/TLogin');
    }
}))

app.use(function (err, req, res, next) {
    next(err);
})

app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = "SOMETHING WENT WRONG : Futher Details : " + err.message || "SOMETHING WENT WRONG";
    res.status(status).render('error.ejs', { message: message });
})

app.listen(8080, function () {
    console.log("APP IS LISTENING TO PORT 8080");
});
