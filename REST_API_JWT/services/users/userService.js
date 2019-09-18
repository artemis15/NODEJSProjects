const express = require("express");
const userModel = require("../../models/user");

/*List of Functions

1)  getUsers
2)  getUserById
3)  createUser
4)  updateUser
5)  deleteUser

*/

const getUsers = async (req, res, next) => {
    try {

        let users = await userModel.find({});
        if (users.length > 0) {
            return res.status(200).json({
                'message': 'Data loaded successfully',
                'data': users
            });
        }

        return res.status(404).json({
            'code': 'Bad_Request',
            'description': 'No Data Found'
        });

    } catch (error) {
        return res.status(500).json({
            'code': 'Internal_Server_Error',
            'description': 'Some Internal Server Error. Please Try Again.'
        });
    }
};

const createUser = async (req, res, next) => {
    try {

        const {
            name,
            email
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email is required',
                'field': 'email'
            });
        }


        let isEmailExists = await userModel.findOne({
            "email": email
        });

        if (isEmailExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'email already exists',
                'field': 'email'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let newUser = await userModel.create(temp);

        if (newUser) {
            return res.status(201).json({
                'message': 'user created successfully',
                'data': newUser
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
};

const getUserById = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.params.id);
        if (user) {
            return res.status(200).json({
                'message': `user with id ${req.params.id} fetched successfully`,
                'data': user
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const updateUser = async (req, res, next) => {
    try {


        const userId = req.params.id;

        const {
            name,
            email
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email is required',
                'field': 'email'
            });
        }


        let isUserExists = await userModel.findById(userId);

        if (!isUserExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No user found in the system'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let updateUser = await userModel.findByIdAndUpdate(userId, temp, {
            new: true
        });

        if (updateUser) {
            return res.status(200).json({
                'message': 'user updated successfully',
                'data': updateUser
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let user = await userModel.findByIdAndRemove(req.params.id);
        if (user) {
            return res.status(204).json({
                'message': `user with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getUserByIdOREmail = async(req,res,next) => {
    try {
        //let user = await userModel.findById(req.params.id);
        
        let userEmail = await userModel.find({email:req.params.id});
        
        
        //console.log(userEmail+"--"+user);
        if (userEmail.length !=0) {
            return res.status(200).json({
                'message': `user with email ${req.params.id} fetched successfully`,
                'data': userEmail
            });
        }
        else {
            let user = await userModel.findById(req.params.id);
            if(user.length !=0)
            {
                return res.status(200).json({
                    'message': `user with id ${req.params.id} fetched successfully`,
                    'data': user
                });
            }
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No users found in the system'
            });
            
        }

        

    } catch (error) {

        return res.status(500).json({
            "err":error,
            'code': 'SERVER_ERROR_EMAIL',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getUsers: getUsers,
    createUser: createUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserByIdOREmail :getUserByIdOREmail
};
