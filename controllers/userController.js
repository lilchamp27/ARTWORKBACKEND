const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/user');


//create a function to register a user 
exports.RegisterUser = async (req, res) => {
    // destructuring 
    const { username, email, password, role } = req.body;

    // use a try catch to check if user exists
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            //this should stop the function from running
            return;
        }

        // create a new user to the Users up there
        const newUser = new Users({
            username,
            email,
            password,
            role
        });
        // save the user
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'user created successfully', data: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'failed to create user', error: error.message });
    }
};

// create a function to login a user
exports.Userlogin = async (req, res) => {
    const { email, password } = req.body;
    // use a try catch to check if user exists
    try {
        const loggedUser = await Users.findOne({ email });
        if (!loggedUser) {
            res.status(400).json({ message: 'User does not exist' });
            //this should stop the function from running
            return;
        }
        //check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, loggedUser.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: 'Invalid credentials' });
        };

        const token = JWT.sign({ userID: loggedUser._id, role: loggedUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'user logged in successfully', data: loggedUser, token });
        console.log(loggedUser.role);
    }
    catch (error) {
        res.status(500).json({ message: 'failed to login user', error: error.message });
    }
}

//create a function  to get profile 
exports.getProfile = async (req, res) => {
    try {
        const userID = req.user.userID;
        const user = await Users.findById(userID);
        res.status(200).json({ message: 'user profile fetched successfully', data: user });
    }
    catch (error) {
        res.status(500).json({ message: 'failed to get user profile', error: error.message });
    }
};