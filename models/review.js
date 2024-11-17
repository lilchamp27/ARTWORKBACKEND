const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: { type: Number, min: 1, max: 5 },
    date: {
        type: Date,
        default: Date.now
    },
    comment: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Review', reviewSchema);