// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { RegisterUser, Userlogin, getProfile } = require('../controllers/userController');
const { isAuth } = require('../middlewares/authMiddleware');

// Routes
router.post('/register', RegisterUser);        // Endpoint for user registration
router.post('/login', Userlogin);              // Endpoint for user login
router.get('/profile', isAuth, getProfile);    // Protected route to get user profile

module.exports = router;
