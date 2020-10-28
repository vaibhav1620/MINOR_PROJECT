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
        question: "I found myself getting upset by quite trivial things",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I was aware of dryness of my mouth",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I couldn't seem to experience any positive feeling at all",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness in the absence of physical exertion)",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I just couldn't seem to get going",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I tended to over-react to situations",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I had a feeling of shakiness (eg, legs going to give way)",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I found it difficult to relax",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I found myself in situations that made me so anxious I was most relieved when they ended",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I felt that I had nothing to look forward to",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I found myself getting upset rather easily",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I felt that I was using a lot of nervous energy",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I felt sad and depressed",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I found myself getting impatient when I was delayed in any way (eg, lifts, traffic lights, being kept waiting)",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I had a feeling of faintness",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I felt that I had lost interest in just about everything",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I felt I wasn't worth much as a person",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I felt that I was rather touchy",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I perspired noticeably (eg, hands sweaty) in the absence of high temperatures or physical exertion",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I felt scared without any good reason",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I felt that life wasn't worthwhile",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I found it hard to wind down",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I had difficulty in swallowing",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I couldn't seem to get any enjoyment out of the things I did",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I was aware of the action of my heart in the absence of physical exertion (eg, sense of heart rate increase, heart missing a beat)",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I felt down-hearted and blue",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I found that I was very irritable",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I felt I was close to panic",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I found it hard to calm down after something upset me",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: 'I feared that I would be "thrown" by some trivial but unfamiliar task',
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I was unable to become enthusiastic about anything",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I found it difficult to tolerate interruptions to what I was doing",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I was in a state of nervous tension",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I felt I was pretty worthless",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I was intolerant of anything that kept me from getting on with what I was doing",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I felt terrified",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I could see nothing in the future to be hopeful about",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I felt that life was meaningless",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'd'
    },
    {
        question: "I found myself getting agitated",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 's'
    },
    {
        question: "I was worried about situations in which I might panic and make a fool of myself",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I experienced trembling (eg, in the hands)",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
        category: 'a'
    },
    {
        question: "I found it difficult to work up the initiative to do things",
        op0: "Never",
        op1: "Sometimes",
        op2: "Often",
        op3: "Almost Always",
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
