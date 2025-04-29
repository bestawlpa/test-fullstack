const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const createUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        return await user.save();
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        return await User.find()
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error fetching user by ID');
    }
};

const getUserForLogin = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw new Error('Error fetching userById: ' + err.message);
    }
}

const sendVerifyCode = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email not found');
        }

        const verifyCode = crypto.randomBytes(3).toString('hex');
        user.verifyCode = verifyCode;
        user.verifyCodeExpiration = Date.now() + 1800000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your account to reset password',
            text: `Your verification code is: ${verifyCode}. It will expire in 30 minutes.`
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        throw error;
    }
};

const resetPassword = async (email, newPassword) => {
    try {
        const user = await User.findOne({ email });
        console.log('user', user);

        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();
    } catch (error) {
        throw new Error('Password reset failed: ' + error.message);
    }
};

module.exports = { createUser, getAllUsers, getUserById, getUserForLogin, sendVerifyCode, resetPassword }