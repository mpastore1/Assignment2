/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let express = require('express');
let router = express.Router();


let ContController = require('../controllers/contacts');

function requireAuth(req,res,next){

    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

router.get('/',  ContController.displayCONTACTS);


router.get('/add',requireAuth, ContController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',requireAuth, ContController.processAddPage);

router.get('/edit/:id',requireAuth, ContController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id',requireAuth, ContController.processEditPage);

module.exports = router;