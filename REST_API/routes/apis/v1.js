const userController = require('../../controllers/apis/userController');
const express = require('express');

let v1APIRouter = express.Router();
v1APIRouter.use('/users',userController);
module.exports = v1APIRouter;