import { check } from 'express-validator';
import validatorMiddleware from '../../../middleware/validatorMiddleware.js';


// create Comment validate
export const createCommentValidator = [
        check('content')
        .notEmpty()
        .withMessage('content is required')
        .isLength({ min: 10 })
        .withMessage('Too short content')
        .isLength({ max: 1000 })
        .withMessage('Too long content'),

        check('postId')
        .notEmpty()
        .withMessage('Author ID is required')
        .isInt({ min: 1 })
        .withMessage('Author ID must be a valid integer'),

        check('userId')
        .notEmpty()
        .withMessage('Author ID is required')
        .isInt({ min: 1 })
        .withMessage('Author ID must be a valid integer'),
    

    validatorMiddleware,
];



//get Comment by id validate
export const getCommentByIdValidator = [
    // 1- rules
    check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Comment id format"),
    validatorMiddleware,
];


//update Comment by id
export const updateCommentValidator = [
    // 1- rules
    check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Comment id format"),
    validatorMiddleware,
];



//delete Comment by id
export const deleteCommentValidator = [
    // 1- rules
    check("id")
        .isInt({ min: 1 })
        .withMessage("Invalid Comment id format"),
    validatorMiddleware,
];