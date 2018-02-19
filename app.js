const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const session= require('express-session');
// const expressValidator=require('express-validator');
const flash=require('connect-flash'); 
const expressMessages=require('express-messages');

//port declaration

let port=3000;

//set mongoose

mongoose.connect('mongodb://localhost/articledb');
let db=mongoose.connection;


//check connection

db.once('open',function(){
    console.log('Connected to mongodb');
});

//check for db errors

db.on('error',function(){
    console.log(err);
});

// declaring models

let article=require('./models/articlesSchema');

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json

app.use(bodyParser.json());

// setting views folder

app.set('views', path.join(__dirname,'views'));

// set view engine

app.set('view engine','pug');

//set public foldder

app.use(express.static(path.join(__dirname,'public')));

//set express session middleware

app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware

//   app.post('/user', [
//     check('username')
//       // Every validator method in the validator lib is available as a
//       // method in the check() APIs.
//       // You can customize per validator messages with .withMessage()
//       .isEmail().withMessage('must be an email')
  
//       // Every sanitizer method in the validator lib is available as well!
//       .trim()
//       .normalizeEmail()
  
//       // ...or throw your own errors using validators created with .custom()
//       .custom(value => {
//         return findUserByEmail(value).then(user => {
//           throw new Error('this email is already in use');
//         })
//       }),


//setting up home router

app.get('/',function(req,res,next){    
    article.find({},function(err,articles){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.render('index',{
                title:'articles page',
                thisarticles:articles
            });
        }
    });
});

let articleRoutes=require('./routes/articleRoutes');
app.use('/article',articleRoutes);

let userRoutes=require('./routes/users');
app.use('/users',userRoutes);


// listen to the port

app.listen(port,function(){
    console.log(`server started at port ${port}`);
});

