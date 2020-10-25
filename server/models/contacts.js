/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let mongoose = require('mongoose');
//const { collection } = require('./book');

let contactModel = mongoose.Schema({
    name: String,
    PhoneNumber: String,
    email : String
},{
    collection: "people"
});

module.exports = mongoose.model('Contacts',contactModel);