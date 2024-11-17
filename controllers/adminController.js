const User = require('../models/user');
const Artwork = require('../models/artwork');
const Review = require('../models/review');

// Helper function to check admin role
const isAdmin = (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ error: 'Access denied, admin only' });
    return false;
  }
  return true;
};

// Code to make admin get all users' accounts
exports.adminGetAllUsers = async (req, res) => {
  if (!isAdmin(req, res)) return;

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Code to make admin delete a user's account
exports.adminDeleteUser = async (req, res) => {
  if (!isAdmin(req, res)) return;

  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user's account
    await user.deleteOne();
    res.json({ message: 'User account deleted successfully' });
    console.log('User account deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Code to make admin delete an artwork
exports.adminDeleteArtwork = async (req, res) => {
  if (!isAdmin(req, res)) return;

  try {
    const artworkId = req.params.artworkId;
    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    // Delete the artwork
    await artwork.deleteOne();
    res.json({ message: 'Artwork deleted successfully' });
    console.log('Artwork deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Code to make admin delete a review
exports.adminDeleteReview = async (req, res) => {
  if (!isAdmin(req, res)) return;

  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Delete the review
    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
    console.log('Review deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = exports;
