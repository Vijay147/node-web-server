const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('makeCapital', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString;
    var log = `${now}: ${req.method}: ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error){
            console.log('unable to print');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});



app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/info', (req, res) => {
    res.send({
        name: 'VishnuVijay',
        age: '25',
        errorMessage: 'Bad Boy'
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
