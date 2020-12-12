const mongoose = require('mongoose');
const formModel = require("./models/form");
mongoose.connect('mongodb://localhost:27017/MinorProject', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO Connection open");
    })
    .catch(err => {
        console.log("MONGO error");
        console.log(err);
    })

const questions = [
    {
        question: "Do you get upset by quite trivial things and tend to over-react to situations?",
        category: 's',
        variant: 'text'
    },
    {
        question: "I was aware of dryness of my mouth",
        category: 'a'
    },
    {
        question: "I couldn't seem to experience any positive feeling at all",
        category: 'd'
    },
    {
        question: "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion)",
        category: 'a'
    },
    {
        question: "Do you ever feel that you just couldn't seem to get going and had nothing to look forward to?",
        category: 'd',
        variant: 'text'
    },
    {
        question: "I had a feeling of shakiness (eg, legs going to give way)",
        category: 'a'
    },
    {
        question: "I found it difficult to relax",
        category: 's'
    },
    {
        question: "I found myself in situations that made me so anxious I was most relieved when they ended",
        category: 'a'
    },
    {
        question: "I found myself getting upset rather easily",
        category: 's'
    },
    {
        question: "I felt that I was using a lot of nervous energy",
        category: 's'
    },
    {
        question: "I felt sad and depressed",
        category: 'd'
    },
    {
        question: "I found myself getting impatient when I was delayed in any way (eg, lifts, traffic lights, being kept waiting)",
        category: 's'
    },
    {
        question: "Did you ever have a feeling of faintness or felt scared without any good reason?",
        category: 'a',
        variant: 'text'
    },
    {
        question: "I felt that I had lost interest in just about everything",
        category: 'd'
    },
    {
        question: "Do you ever feel that you aren't worth much as a person and that life wasn't worthwhile?",
        category: 'd',
        variant: 'text'
    },
    {
        question: "I felt that I was rather touchy",
        category: 's'
    },
    {
        question: "I perspired noticeably (eg, hands sweaty) in the absence of high temperatures or physical exertion",
        category: 'a'
    },
    {
        question: "I found it hard to wind down",
        category: 's'
    },
    {
        question: "I had difficulty in swallowing",
        category: 'a'
    },
    {
        question: "I couldn't seem to get any enjoyment out of the things I did",
        category: 'd'
    },
    {
        question: "I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat)",
        category: 'a'
    },
    {
        question: "I felt down-hearted and blue",
        category: 'd'
    },
    {
        question: "Did you find yourself very irritable and found it hard to calm down after something upsets you?",
        category: 's',
        variant: 'text'
    },
    {
        question: 'Do you ever feel you were close to panic or feared that you would be "thrown" by some trivial but unfamiliar task?',
        category: 'a',
        variant: 'text'
    },
    {
        question: "I was unable to become enthusiastic about anything",
        category: 'd'
    },
    {
        question: "I found it difficult to tolerate interruptions to what I was doing",
        category: 's'
    },
    {
        question: "I was in a state of nervous tension",
        category: 's'
    },
    {
        question: "Do you think that you're pretty worthless and could see nothing in the future to be hopeful about?",
        category: 'd',
        variant: 'text'
    },
    {
        question: "Did you feel that you're intolerant of anything that kept me from getting on with what you're doing and feel getting agitated?",
        category: 's',
        variant: 'text'
    },
    {
        question: "Do you ever feel terrified or get worried about situations in which you might panic and make a fool of yourself?",
        category: 'a',
        variant: 'text'
    },
    {
        question: "I felt that life was meaningless",
        category: 'd'
    },
    {
        question: "I experienced trembling (eg, in the hands)",
        category: 'a'
    },
    {
        question: "I found it difficult to work up the initiative to do things",
        category: 'd'
    }
];

formModel.insertMany(questions)
    .then(res => {
        console.log("DONE");
    })
    .catch(err => {
        console.log(err);
    })
