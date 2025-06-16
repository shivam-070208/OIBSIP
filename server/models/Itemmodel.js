const mongoose = require('mongoose');


const Item = new mongoose.Schema({
    ItemType:{
        type:String,
        required:true
    },
    Category:{
        type:String
    },
    Name:{
        type:String
    },
    Image:{
        type:String
    },
    Price:{
        type:Number
    },
    Seller:{
        type:String
    },

    Description:{
        type:String
    },
    Organisation:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    }
});


module.exports = mongoose.model('Itemmodel',Item);