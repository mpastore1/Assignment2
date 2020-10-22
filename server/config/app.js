/*Marco Pastore
Student number: 301101814
Date 10/6/2020 */
// installed third party packages 
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// moduals for authentication 

let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal;
let flash = require('connect-flash');




//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//poiting mongoose to the db uri
mongoose.connect(DB.URI,{useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', ()=>{
  console.log('connected to mongoDB')
})

let indexRouter = require('../routes/index');// you
let usersRouter = require('../routes/users');// others
let booksRouter = require('../routes/book');
//const { Passport } = require('passport');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname,'../../node_modules')))

// set up express-session

app.use(session({
  secret: "someSecret",
  saveUninitialized : false,
  resave: false
}));


//flash

app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

let userModel = require('../models/user');
let User = userModel.User;

passport.use(User.createStrategy());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book-list',booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

module.exports = app;
