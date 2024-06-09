import express from 'express';
import { 
    createPostValidator,
    getPostByIdValidator,
    updatePostValidator,
    deletePostValidator,
} from '../../utils/validator/posts/postValidator.js';

import { 
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostByUser
} from '../../controller/posts/postController.js';

const router = express.Router();



router
    .post("/createPost", createPostValidator, createPost)
    .get('/getPosts', getPosts)
    .get('/getPostById/:id', getPostByIdValidator, getPostById)
    .put('/updatePost/:id', updatePostValidator, updatePost)
    .delete('/deletePost/:id', deletePostValidator, deletePost)
    .get("/getPostByUser/:userId", getPostByUser)



export default router;
