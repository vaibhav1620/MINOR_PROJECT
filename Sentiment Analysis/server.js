let online = false;

var express = require('express');
var http = require('http');

const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

var app = express();

let tPort = process.env.PORT || 3000;
if(process.argv.slice(2).length > 0){
	tPort = process.argv.slice(2)[0];
}

app.set('port', tPort);

var server = http.createServer(app);
const listener = server.listen(tPort, function() {
	if(online){
		console.log('sentilyzer is running! port: ' + listener.address().port);
	}else{
		console.log('sentilyzer is running! http://localhost: ' + listener.address().port);
	}
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// handle call
app.get('/', function(req, res){

	if(req.query.q){
		let q = req.query.q;

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

		// console.log(analysis)

		res.send({'analysis':analysis});
	}else{
		res.send('usage -> <a href="?q=your-text-here">'+req.get('host')+'?q=your-text-here</a><br>source code -> <a href="https://github.com/ffd8/sentilyzer">github</a>');
	}
});