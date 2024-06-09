import express from 'express';
import { 
    createUserValidator,
    updatePostByUserValidator,
    softDeletePostByUserValidator,
    
} from '../../utils/validator/users/userValidator.js';

import { 
    createUser, 
    updatePostByUser,
    softDeletePostByUser,
    getUserWithPostAndComments,

} from '../../controller/users/userController.js';

const router = express.Router();

router
    .post("/createUser", createUserValidator, createUser)
    .put('/updatePostByUser/:id', updatePostByUserValidator, updatePostByUser)
    .delete('/softDeletePostByUser/:id', softDeletePostByUserValidator, softDeletePostByUser)
    .get("/getUserWithPostAndComments/:userId/:postId", getUserWithPostAndComments)



export default router;
