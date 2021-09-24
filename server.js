////////////////////////////////////////////////////
//////     CONST'S
////////////////////////////////////////////////////
const express = require("express");
// const methodOverride = require('method-override');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const scientists = require('./models/scientist')
////////////////////////////////////////////////////
//////     MIDDLEWARE
////////////////////////////////////////////////////
app.use((req, res, next) => {
    console.log('Middleware, checking in');
    next();
});
//middleware for form
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// app.use(methodOverride('_method'));

////////////////////////////////////////////////////
//////     ROUTES
////////////////////////////////////////////////////

//index
app.get('/planets', (req, res) => {
    res.render('index.ejs', { scientists: scientists });
});

// new
app.get('/planets/new', (req, res) => {
    res.render('new.ejs');
});

// create
app.post('/planets', (req, res) => {
    scientists.push(req.body);
    res.redirect('/planets');
});


//show 
app.get('/planets/:id', (req, res) => {
    res.render('show.ejs', { 
        scientists: scientists[req.params.id] 
    });
});

// delete
app.delete('/planets/:id', (req, res) => {
    scientists.splice(req.params.id, 1); //remove the item from the array
    res.redirect('/planets');  //redirect back to index route
});





////////////////////////////////////////////////////
//////     LISTEN UP
////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`listening on port`, port)
});