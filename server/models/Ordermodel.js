const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    userId: {
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
        Seller:{
            type:String
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    Payment:{
        type:String,
        enum:['Pending','Completed'],
        default:'Pending'
    }
});


module.exports = mongoose.model('Order',OrderSchema);