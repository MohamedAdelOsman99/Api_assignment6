import { check } from 'express-validator';
import validatorMiddleware from '../../../middleware/validatorMiddleware.js';

//create validate
export const createPostValidator = [
    check('title')
        .notEmpty()
        .withMessage('title is required')
        .isLength({ min: 3 })
        .withMessage('Too short title')
        .isLength({ max: 50 })
        .withMessage('Too long title'),


        check('content')
        .notEmpty()
        .withMessage('content is required')
        .isLength({ min: 10 })
        .withMessage('Too short content')
        .isLength({ max: 1000 })
        .withMessage('Too long content'),

        check('authorId')
        .notEmpty()
        .withMessage('Author ID is required')
        .isInt({ min: 1 })
        .withMessage('Author ID must be a valid integer'),
    

    validatorMiddleware,
];



//get post by id validate
export const getPostByIdValidator = [
    // 1- rules
    check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Post id format"),
    validatorMiddleware,
];


//update post by id
export const updatePostValidator = [
    // 1- rules
    check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Post id format"),
    validatorMiddleware,
];



//delete post by id
export const deletePostValidator = [
    // 1- rules
    check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Post id format"),
    validatorMiddleware,
];
