const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usermodel',
        required: true
    },
    items: [{
        ItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Itemmodel',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
})


module.exports = mongoose.model('Cart',CartSchema);