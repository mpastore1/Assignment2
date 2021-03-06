/*Marco Pastore
Student number: 301101814
Date 10/25/2020 */
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({

    username:{
        type: String,
        default: "",
        trim: true,
        required: "Name is important"
    },
    password:{
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
    displayname:{
        type: String,
        default: "",
        trim: true,
        required: "displayName is important"
    }


},{
    collection : 'people'
})


// configure options 

let options = ({missingPasswordError: "Wrong/ missing password"});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User',User);
