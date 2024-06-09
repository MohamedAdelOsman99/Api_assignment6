import asyncHandler from'express-async-handler';
import ApiError from '../../utils/apiError.js';
import User from '../../model/users/userModel.js';
import bcrypt from 'bcryptjs';
import Post from '../../model/posts/postModel.js'
import Comment from '../../model/comments/commentModel.js'



//create user
export const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const user = await User.create({ username, email, password: hashedPassword });

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
            message: 'User not created',
            error: error.message
        });
    }
});



// update posts by user
export const updatePostByUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, content, authorId } = req.body; 
    const post = await Post.findOne({ where: { id } });

    if (!post) {
        return next(new ApiError(`Post with ID ${id} not found`, 404));
    }

    if (post.authorId !== authorId) {
        return next(new ApiError('You are not authorized to update this post', 403));
    }

    // update post
    await post.update({ title, content });

    // response
    res.status(200).json({
        status: 'success',
        code: '200',
        date: new Date(),
        message: 'Post updated successfully',
        data: post
    });
});



// Soft Delete Post bu user
export const softDeletePostByUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { authorId } = req.body; 

    const post = await Post.findOne({ where: { id } });

    if (!post) {
        return next(new ApiError(`Post with ID ${id} not found`, 404));
    }

    if (post.authorId !== authorId) {
        return next(new ApiError('You are not authorized to delete this post', 403));
    }

    //soft delete
    await post.update({ deleted: true });

    //response
    res.status(200).json({
        status: 'success',
        code: '200',
        date: new Date(),
        message: 'Post soft deleted successfully',
        data: post
    });
});




//Special endpoint to get a specific user with a specific post and post’s comments.
export const getUserWithPostAndComments = asyncHandler(async (req, res, next) => {
    const { userId, postId } = req.params;

    if (!userId || !postId) {
        return next(new ApiError('userId and postId are required', 400));
    }

    const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }, // Exclude the password attribute
        include: [
            { model: Post, as: 'posts' },
            { model: Comment, as: 'comments' }
        ]
    });

    if (!user) {
        return next(new ApiError(`User with ID ${userId} not found`, 404));
    }

    const post = user.posts.find(post => post.id === parseInt(postId));

    if (!post) {
        return next(new ApiError(`Post with ID ${postId} not found`, 404));
    }

    // counts posts and comments for user
    const postCount = user.posts.length;
    const commentCount = user.comments.length;

    // response
    res.status(200).json({
        status: 'success',
        code: '200',
        date: new Date(),
        postCount,
        commentCount,
        data: {
            user
        }
    });
});




