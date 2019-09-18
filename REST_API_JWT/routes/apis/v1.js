const userController = require('../../controllers/apis/userController');
const authController = require('../../controllers/auth/authController');
const express = require('express');

let v1APIRouter = express.Router();
v1APIRouter.use('/users',userController);
v1APIRouter.use('/auth',authController);
module.exports = v1APIRouter;