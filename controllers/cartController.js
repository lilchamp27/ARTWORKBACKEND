const Cart = require('../models/cart');
const Artwork = require('../models/artwork');

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const userId = req.user.userID;
    const { artworkId } = req.body;

    try {
        // Check if the artwork exists
        const artwork = await Artwork.findById(artworkId);
        if (!artwork) {
            return res.status(404).json({ message: 'Artwork not found' });
        }

        // Check if cart exists for the user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new Cart({ user: userId, items: [] });
        }

        // Add artwork to items array
        cart.items.push(artworkId);
        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

// Get user cart
exports.getUserCart = async (req, res) => {
    const userId = req.user.userID;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
};

// Remove item from cart
exports.removeItemFromCart = async (req, res) => {
    const userId = req.user.userID;
    const { artworkId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the item to be removed
        cart.items = cart.items.filter(item => item.toString() !== artworkId);
        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    const userId = req.user.userID;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ success: true, message: 'Cart cleared successfully', data: cart });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error });
    }
};

module.exports = exports;