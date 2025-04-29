// userController
const userService = require('../service/userService')
const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one uppercase letter.'
            });
        }

        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one number.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already in use. Please choose another one.' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already in use. Please choose another one.' });
        }

        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: 'User created successfully!',
            data: user
        });

    } catch (err) {
        res.status(500).json({ message: err.message || 'Error creating user.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const result = users.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
        }))
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserForLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userService.getUserForLogin(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            }, SECRET_KEY,
            {
                expiresIn: '24h'
            }
        )

        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login Success",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message || 'Error fetch user.' });
    }
};

const sendVerifyCode = async (req, res) => {
    const { email } = req.body;

    try {
        await userService.sendVerifyCode(email);
        res.status(200).json({ message: 'Verification code sent to your email.' });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error sending verification code.' });
    }
};

const resetPassword = async (req, res) => {
    const { email, verifyCode, newPassword, confirmPassword } = req.body;
    console.log(req.body);

    if (!email || !verifyCode || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("verify", user.verifyCode);

        if (user.verifyCode !== verifyCode) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        await userService.resetPassword(email, newPassword);
        res.status(200).json({ message: 'Password reset successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createUser, getAllUsers, getUserById, getUserForLogin, sendVerifyCode, resetPassword };