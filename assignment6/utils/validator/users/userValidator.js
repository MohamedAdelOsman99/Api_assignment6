import { check } from 'express-validator';
import userModel from '../../../model/users/userModel.js';
import validatorMiddleware from '../../../middleware/validatorMiddleware.js';

//create validate
export const createUserValidator = [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Too short username')
        .isLength({ max: 32 })
        .withMessage('Too long username'),

    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom(async (value) => {
            const user = await userModel.findOne({ where: { email: value } });
            if (user) {
                return Promise.reject('Email already in use');
            }
        }),

    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Too short password')
        .isLength({ max: 50 })
        .withMessage('Too long password'),

    validatorMiddleware,
];


// update validate
export const  updatePostByUserValidator = [
        // 1- rules
        check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Post id format"),
    validatorMiddleware,
];


// soft delete validate
export const softDeletePostByUserValidator = [
        // 1- rules
        check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Post id format"),
    validatorMiddleware,
];






