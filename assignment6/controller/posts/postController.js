import asyncHandler from'express-async-handler';
import ApiError from '../../utils/apiError.js';
import Post from '../../model/posts/postModel.js';
import User from '../../model/users/userModel.js';

// create post
export const createPost = asyncHandler(async (req, res) => {
    const { title, content, authorId } = req.body;

    try {
        const user = await Post.create({ title, content, authorId });
        res.status(201).json({
            status: 'success',
            code: '201',
            date: new Date(),
            data: user
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            code: '400',
            date: new Date(),
            message: 'Post not created',
            error: error.message
        });
    }
});


//get posts
export const getPosts =  asyncHandler(async (req, res) => {
    const page = req.query.page * 1 ||  1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const posts = await Post.findAll({skip : skip, limit : limit});
    
    res.status(200).json({ 
        status : "success",
        code : "200",
        date : new Date(),
        result : posts.length,
        page,
        data: posts 
    });
    
});



// get post By Id
export const getPostById = asyncHandler(async (req, res) => {

        const user = await Post.findByPk(req.params.id);
        if(!user){
            return next(new ApiError(`This ID ${id} for post not found`, 404));
        }
        res.status(200).json({
            status : 'success',
            code : "200",
            date : new Date(),
            data : user
        });
});



//update post
export const updatePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content, authorId } = req.body;

    // First, find the post to ensure it exists
    const post = await Post.findByPk(id);
    if (!post) {
        return next(new ApiError(`This ID ${id} for post not found`, 404));
    }

    // Update the post
    await post.update({ title, content, authorId });

    // Fetch the updated post
    const updatedPost = await Post.findByPk(id);

    // Send the response with the updated post data
    res.status(200).json({
        status: 'success',
        code: '200',
        date: new Date(),
        data: updatedPost
    });
});



//delete post
export const deletePost = asyncHandler( async (req, res, next) => {
    const {id} = req.params;

    const post = await Post.destroy({ where: { id: id } });

    if(!post){

        
        return next(new ApiError(`This ID ${id} for post not found`, 404));
    }
    res.status(200).json({
        status : 'success',
        code : "200",
        date : new Date(),
        message : "post deleted"
    });
});



//Get a specific post with the author.
export const getPostByUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
        return next(new ApiError('userId is required', 400));
    }


        const user = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password'] }, 
            include: [
                {
                    model: Post,
                    as: 'posts'
                }
            ]
        });

        if (!user) {
            return next(new ApiError(`User with ID ${userId} not found`, 404));
        }

        // response 
        res.status(200).json({
            status: 'success',
            code: '200',
            date: new Date(),
            data: {
                user
            }
        });
});


