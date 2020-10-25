/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
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
            displayname: req.user ? req.user.displayname : ''
        })
    }else
    {
        return res.redirect('/contacts');
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
            return res.redirect('/contacts');
        })
    })(req,res,next);
}


module.exports.displayRegisterPage = (req,res,next) =>{

    if(!req.user){

        res.render('auth/register',{
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayname: req.user ? req.user.displayname : ''
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
    displayname: req.body.displayname

})

User.register(newUser, req.body.password, (err) => {
    if(err){
        console.log(err);
        if(err.name == "UserExsistsError"){
            console.log(err)
            req.flash(
                'registerMessage',
                'Registration Error: User Already Exists!'
            );

        }
        return res.render('auth/register',{
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayname: req.user ? req.user.displayname : ''
        })
    }else
    {
        return passport.authenticate('local')(req,res,() =>{
            res.redirect('/contacts')
        })
    }
})
}

module.exports.performLogout = (res,req,next) => {
req.logout();
res.redirect('/');
}
