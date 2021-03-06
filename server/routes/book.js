/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

function requireAuth(req,res,next){

    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

let bookController = require('../controllers/book');

/* GET Route for the Book List page - READ Operation */
router.get('/', bookController.displayBookList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',requireAuth, bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth,bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id',requireAuth, bookController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth,bookController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth,bookController.performDelete);

module.exports = router;