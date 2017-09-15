const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/header');
app.set('view engine', 'hbs');
//middleware


app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs',{
//         welcomeMessage:'The site is currently under maintenance'
//     })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear()

})

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
})

//http handlers
app.get('/', (req, res) =>{
   // res.send('<h1>Hello Express!</h1>');
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       homeTitlte: 'Home Page',
       welcomeMessage: 'Welcome to my first web app',
   })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage:'Error handling the request'
    })
})


app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});