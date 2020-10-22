
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "username is important"
    },
    password:{
        type: String,
        default: "",
        trim: true,
        required: "Password is important"
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
        required: "Display Name is important"
    },
    created:{
        type: String,
        default: Date.now,
        
    },
    update:{
        type: String,
        default: Date.now,
    }
},
{
    collection : 'user'
}
);


// configure options 

let options = ({missingPasswordError: "Wrong/ missing password"});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User',User);