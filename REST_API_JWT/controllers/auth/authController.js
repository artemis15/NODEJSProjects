const express = require('express');
const authService = require('../../services/auth/auth');
const validation = require('../../middlewares/validation');
let authController = express.Router();

authController.post("/register",validation.validateRegistrationBody(),authService.register);
authController.post("/login",validation.validateLoginBody(),authService.login);

module.exports = authController;