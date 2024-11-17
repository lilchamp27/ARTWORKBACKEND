// middleware to authenticate if you're an admin
const user = require('../models/user');
const userController = require('../controllers/userController');

exports.adminAuth = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' })
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};