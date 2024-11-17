const Review = require('../models/review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { name, review, rating, comment, product } = req.body;

        const newReview = new Review({
            name,
            review,
            rating,
            comment,
            product
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('product');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('product');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = exports;