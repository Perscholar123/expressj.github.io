const express = require('express');
const app = express();

// greeting..................
app.get('/greeting', (req, res) => {
    res.send('<h1>Hello Stranger!!</h1>');
});

//add show route
app.get('/greeting/:name', (req, res)=>{
    console.log(req.params.name);
    res.send("Wow! Hello there,"+req.params.name);
});

// tip calculator.............

app.get('/tip', (req, res) => {
    res.send('<h1>Tip calculator!!</h1>');
});

app.get('/tip/:total/:tipPercentage', (req, res) => {
    console.log(req.params.total);
    // let total = Number(req.params.total);
    let total = +req.params.total;
    // let tipPercentage = Number(req.params.tipPercentage);
    let tipPercentage = +req.params.tipPercentage;
    // let tip = total * (tipPercentage/100);
    let tip= total * (tipPercentage/100);
    // tip = String(tip);
    tip = tip + "";
    console.log(tip)
    res.send(tip);
});

// Magic 8 Ball..........................
app.get('/magic/:question', function(req,res){
    let answers = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]
    let q = req.params.question;
    q.replace(/%20/g, " ")
    let randomNum = Math.floor(Math.random()* answers.length)

    res.send(q + "<h1>" + answers[randomNum] + "</h1>");
})

// Take one Down and Pass it Around.................

let currentNumOfBeers = 99;
app.get('/beer', (req, resp) => {
    currentNumOfBeers = 99;
    resp.send([`<h2>${currentNumOfBeers} Bottles of beer on the wall.`, `<a href="http://localhost:3000/beer/${currentNumOfBeers - 1}">Take one down, pass it around!</a>`].join(''));
});
app.get(`/beer/:${ currentNumOfBeers < 0 ? 0 : currentNumOfBeers }`, (req, resp) => {
    currentNumOfBeers -= 1;
    
    if (currentNumOfBeers === 0) {
        resp.send([`<h2>${currentNumOfBeers} Bottles of beer on the wall.`, `<a href="http://localhost:3000/beer">Start Over</a>`].join(''));    
    }
    resp.send([`<h2>${currentNumOfBeers} Bottles of beer on the wall.`, `<a href="http://localhost:3000/beer/${currentNumOfBeers - 1}">Take one down, pass it around!</a>`].join(''));
});

// Hungry for more? Fibonacci...................................

function fib(num) {
    let n1 = 0, n2 = 1, nextTerm;
    let f = [];
    for (let i = 0; i <= num; i++) {
        f.push(n1);
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
    }
    return f;
}

app.get('/fibonacci', (req, resp) => {
    resp.send(fib(100));
});
app.get('/fibonacci/:num', (req, resp) => {
    let fibNums = fib(100);
    let isFib = false;
    let fibNum = Math.floor(req.params.num);

    for (let i = 0; i < fibNums.length; i++) {
        if (fibNum === fibNums[i]) {
            isFib = true;
            break;
        }
    }
    resp.send(isFib ? 'This is a fibonacci number!' : 'This is NOT a fibonacci number!');
});

// --------------------
app.listen(3000, () => {
    console.log('listening');
});

