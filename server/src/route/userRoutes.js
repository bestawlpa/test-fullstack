const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/register', userController.createUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.getUserForLogin);
router.post('/send-verify-code', userController.sendVerifyCode);
router.put('/reset-password', userController.resetPassword);

module.exports = router;