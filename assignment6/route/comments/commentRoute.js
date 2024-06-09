import express from 'express';
import { 
    createCommentValidator ,
    getCommentByIdValidator,
    updateCommentValidator,
    deleteCommentValidator
} from '../../utils/validator/comments/commentValidator.js';

import { 
    createComment, 
    getComments,
    getCommentById,
    updateComment,
    deleteComment
} from '../../controller/comments/commentController.js';




const router = express.Router();


router
    .post("/createComment", createCommentValidator, createComment)
    .get('/getComments', getComments)
    .get('/getCommentById/:id', getCommentByIdValidator, getCommentById)
    .put('/updateComment/:id', updateCommentValidator, updateComment)
    .delete('/deleteComment/:id', deleteCommentValidator, deleteComment)




export default router;
