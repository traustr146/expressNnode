
const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const flash=require('connect-flash'); 

//bringing userSchema model

let user=require('../models/userSchema');


//passport configuration

passport.use(new LocalStrategy(
    function(username, password, done) {
      user.findOne({ username: username }, function (err, user) {
        console.log(user);
        if (err) throw err; 
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password,user.password,function(err,isMatch){
            if (err) throw err;
            if (isMatch){
                return done(null, user);
            }
            else{
                return done(null, false, { message: 'wrong password '});
            }
            });
        });
    }));

    router.use(passport.initialize());
    router.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
          done(err, user);
        });
      });


router.get('/register',function(req,res,next){
    res.render('register',{
        title:'User Registeration'
    });
});

router.post('/register',function(req,res,next){
    let newuser= new user();
    newuser.email=req.body.email;
    newuser.username=req.body.username;
    newuser.password=req.body.password;
    newuser.password2=req.body.password2;
    let saltRounds=10;
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(newuser.password,salt,function(err,hash){
            if (err){
                console.log(err);
            }
            newuser.password=hash;
            newuser.password2=hash;
            newuser.save(function(err){
                if (err){
                    console.log(err);
                }
                else{
                    req.flash('success','your account has been registered, login to continue');
                    res.redirect('/users/login');
                }
            });
        });
    });
});

router.get('/login',function(req,res,next){
    res.render('Login',{
        title:'Login'
    });
});

router.post('/login',function(req,res,next){
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash:true,
    })(req, res, next);
});

module.exports=router;
