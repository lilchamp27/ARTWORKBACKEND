const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

        id: {
            type: String,
            unique: true
        },

        username: {
                type: String,
                required: true
        },

        email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true
        },

        password: {
                type: String,
                required: true,
                minlength: 6
        },

        profilePicture: {
                type: String,
                default: ''
        },

        role: {
                type: String,
                enum: ['user', 'admin'],
                default: 'user'
        },

        listings: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artwork'
        }],

        purchases: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artwork'
        }]

});
      // hashing the password
      userSchema.pre('save', async function (next) {
        // Only hash the password if it has been modified (or is new)
        if (!this.isModified('password')) {
                return next();
        }
        try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(this.password, salt);
                this.password = hashedPassword;
                next();
        } catch (error) {
                next(error);
        }
});



module.exports = mongoose.model("User", userSchema); 