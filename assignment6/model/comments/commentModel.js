// models/CommentModel.js

import { DataTypes } from 'sequelize';
import sequelize from '../../config/DB/connection.js';

import User from '../../model/users/userModel.js';
import Post from '../../model/posts/postModel.js';

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'comments',
    timestamps: true,
});


//relations comment
Comment.belongsTo(User, { foreignKey: 'userId' , as: 'users'});
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'posts' });



Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
User.hasMany(Comment, { foreignKey: 'userId' , as: 'comments'});


export default Comment;
