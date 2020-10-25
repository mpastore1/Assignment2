/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//const contacts = require('../models/contacts');
let contact = require('../models/contacts');


module.exports.displayCONTACTS = (req,res,next) =>{
    contact.find((err,contList) =>{
      
        if(err)
        {
            return console.error(err);
        }
        else
        {
            

            res.render('contacts/list', {title: 'Contacts', CONTList: contList});     
            
        }
    })
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title: 'Add Contact'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = contact({
        "name": req.body.name,
        "PhoneNumber": req.body.PhoneNumber,
        "email": req.body.email
        
    });
    
    contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/contacts');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    
    contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            
            //show the edit view
            res.render('contacts/edit', {title: 'Edit Page', contact: contactToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updateContact = contact({
        "_id": id,
        "name": req.body.name,
        "PhoneNumber": req.body.PhoneNumber,
        "email": req.body.email
    });
    console.log(updateContact);
    contact.updateOne({ _id : id}, updateContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
           
            res.redirect('/contacts');
        }
    });
}



