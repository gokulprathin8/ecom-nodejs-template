const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory field'],
        maxLength: [1024, 'Name should be less than 1024 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password should be atleast 6 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user',
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// validate existing password
userSchema.methods.validatePassword = async function(userSentPassword) {
    await bcrypt.compare(userSentPassword, this.password);
}

// create and return jwt token
userSchema.methods.getJwtToken = function() {
    jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

// generate forgot password token
userSchema.methods.getForgotPasswordToken = function() {
    const forgotToken = crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex');
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
    return forgotToken;
}

module.exports = mongoose.model('user', userSchema);