// createing app
const express = require('express');

// preprocessing


// const aposToLexForm = require('apos-to-lex-form');

// // npl algos
// const natural = require('natural');

// // spelling corrector
// const SpellCorrector = require('spelling-corrector');

// // Removing stop words
// const SW = require('stopword');

// client sends frrdback and we return our sentiment analysis
// --start--
const router = express.Router();

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();


router.post('/s-analyzer', function(req, res, next) {
  const { review } = req.body;
//   const lexedReview = aposToLexForm(review); //convet i'm to "i am"
//   const casedReview = lexedReview.toLowerCase(); //all text to lower case
//   const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, ''); //removing all special characters

// // convet sentence and para to word size token
//   const { WordTokenizer } = natural;
//   const tokenizer = new WordTokenizer();
//   const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

// //  // spell check all tokens
//   tokenizedReview.forEach((word, index) => {
//     tokenizedReview[index] = spellCorrector.correct(word);
//   })

// // Removing stop words
//   const filteredReview = SW.removeStopwords(tokenizedReview);


// Sentiment analysis with the Natural library
   const { SentimentAnalyzer, PorterStemmer } = natural;
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  // const analysis = analyzer.getSentiment(filteredReview);
  const analysis = analyzer.getSentiment(review);

  res.status(200).json({ analysis });
});
// --end--

module.exports = router;