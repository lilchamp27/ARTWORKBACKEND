const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    title: 
    { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String, required: true },
    status: { type: String, enum: ['available', 'sold'], default:
    'available' },
    stockQuantity: { type: Number, default: 1 },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default:
    null },
    datePosted: { type: Date, default: Date.now }
 });

   module.exports = mongoose.model('Artwork', ArtworkSchema);
