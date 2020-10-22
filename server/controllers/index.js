let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


let userModel = require('../models/user')
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About'});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects'});
}


module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services'});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact'});
}

module.exports.displayLoginPage = (req,res,next) => {
    if(!req.user){
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }else
    {
        return res.redirect('/');
    }

}

module.exports.processLoginPage = (req,res,next) =>{
    passport.authenticate('local', (err,user,info) => {
        if(err){
            return next(err);
        }

        if(!user){
            req.flash('loginMessage', 'Authentication Error')
            return res.redirect('/login')
        }
        req.login(user,(err) => {
            if(err){
                return next(err);

            }
            return res.redirect('/book-list');
        })
    })(req,res,next);
}


module.exports.displayRegisterPage = (req,res,next) =>{

    if(!req.user){

        res.render('auth/register',{
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        })        

    }else{
        return res.redirect('/');
    }


}


module.exports.processRegisterPage = (req,res,next) => {
let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName

})

User.register(newUser, req.body.password, (err) => {
    if(err){
        console.log(err);
        if(err.name == "UserExsistsError"){
            console.log("Error: ")
            req.flash(
                'registerMessage',
                'Registration Error: User Already Exists!'
            );

        }
        return res.render('auth/register',{
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }else
    {
        return passport.authenticate('local')(req,res,() =>{
            res.redirect('/book-list')
        })
    }
})
}

module.exports.performLogout = (res,req,next) => {
req.logout();
res.redirect('/');
}
