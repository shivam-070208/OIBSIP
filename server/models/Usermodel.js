const mongoose = require('mongoose');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'User'
    },
    UserInstance: {
        type:new Array({
            role:String,
            Data: []
        })
    },
    Organisation:{
        type:String
    },
    Address:{
        type:String
    }

});

const Usermodel = mongoose.model('Usermodel', UserSchema);

module.exports = Usermodel;
