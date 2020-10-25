/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let mongoose = require('mongoose');

let bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},{
    collection: 'books'
})


module.exports = mongoose.model('Book',bookModel);