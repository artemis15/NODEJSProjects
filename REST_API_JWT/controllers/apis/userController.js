
const express = require('express');
const userService = require('../../services/users/userService');
let userControllerRouter = express.Router();

userControllerRouter.get('/', userService.getUsers);
userControllerRouter.post('/', userService.createUser);


userControllerRouter.get('/:id', userService.getUserById);


userControllerRouter.put('/:id', userService.updateUser);

userControllerRouter.delete('/:id', userService.deleteUser);



module.exports = userControllerRouter;