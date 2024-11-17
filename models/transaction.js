const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    artwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' },

    dateOfPurchase: { type: Date, default: Date.now },
    
    totalPrice: { type: Number, required: true }
   
});

module.exports = mongoose.model('Transaction', TransactionSchema);
