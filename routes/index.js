/*Marco Pastore
Student number: 301101814
Date 10/6/2020 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

// About
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About'});
});
//Product
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects'});
});

// services
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services'});
});

// contact
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact'});
});


module.exports = router;
