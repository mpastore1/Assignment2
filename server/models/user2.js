/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let user2 = mongoose.Schema({

    name:{
        type: String,
        default: "",
        trim: true,
        required: "Name is important"
    },
    PhoneNumber:{
        type: String,
        default: "",
        trim: true,
        required: "phone is important"
    },
    email:{
        type: String,
        default: "",
        trim: true,
        required: "email is important"
    },


},{
    collection : 'people'
})
let options = ({missingPasswordError: "Wrong/ missing password"});

user2.plugin(passportLocalMongoose, options);

module.exports.user2 = mongoose.model('user2',user2);

