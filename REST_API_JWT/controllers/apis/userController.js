
const express = require('express');
const userService = require('../../services/users/userService');
const authGuard = require('../../middlewares/authgaurd');
let userControllerRouter = express.Router();

//userControllerRouter.get('/', userService.getUsers);
//userControllerRouter.post('/', userService.createUser);


userControllerRouter.get('/:id', authGuard.authClientToken ,userService.getUserByIdOREmail);


//userControllerRouter.put('/:id', userService.updateUser);

//userControllerRouter.delete('/:id', userService.deleteUser);



module.exports = userControllerRouter;