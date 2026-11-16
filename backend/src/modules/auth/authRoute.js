const express = require('express');

const router = express.Router();

const registerController = require('./register/registerController');
const loginController = require('./login/loginController');

router.post('/register',  registerController.register);
router.post('/login',  loginController.login);


module.exports = router;