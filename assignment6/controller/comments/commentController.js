import asyncHandler from'express-async-handler';
import ApiError from '../../utils/apiError.js';
import Comment from '../../model/comments/commentModel.js';

// create user
export const createComment = asyncHandler(async (req, res) => {
    const { content, userId, postId } = req.body;

    try {
        const user = await Comment.create({ content, userId, postId });
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
            message: 'Comment not created',
            error: error.message
        });
    }
});


//get posts
export const getComments =  asyncHandler(async (req, res) => {
    const page = req.query.page * 1 ||  1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const comments = await Comment.findAll({skip : skip, limit : limit});
    
    res.status(200).json({ 
        status : "success",
        code : "200",
        date : new Date(),
        result : comments.length,
        page,
        data: comments 
    });
    
});



// get post By Id
export const getCommentById = asyncHandler(async (req, res) => {

        const comment = await Comment.findByPk(req.params.id);
        if(!comment){
            return next(new ApiError(`This ID ${id} for Comment not found`, 404));
        }
        res.status(200).json({
            status : 'success',
            code : "200",
            date : new Date(),
            data : comment
        });
});



//update post
export const updateComment = asyncHandler( async (req, res, next) => {
    const {id} = req.params;
    const {content, postId, userId} = req.body;

    const updateComments = await Comment.update(
        {content, postId, userId},
        { where: { id: id } },
        
    );
    if(!updateComments){
    
        return next(new ApiError(`This ID ${id} for comment not found`, 404));
    }
    res.status(200).json({
        status : 'success',
        code : "200",
        date : new Date(),
        data : updateComments
    });
});



//delete post
export const deleteComment = asyncHandler( async (req, res, next) => {
    const {id} = req.params;

    const post = await Comment.destroy({ where: { id: id } });

    if(!post){

        
        return next(new ApiError(`This ID ${id} for comment not found`, 404));
    }
    res.status(200).json({
        status : 'success',
        code : "200",
        date : new Date(),
        message : "comment deleted"
    });
});