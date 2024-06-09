/*-----------------------------------------------*
*                                               *
*              Assignment 6                     *
*                                               *
------------------------------------------------*/

//  Documentation //
//  name :- Mohamed Adel
//  description :- MON - THU ( 7:00 - 10:00 )


// packages use //
//npm install express
//npm install express-async-handler
//npm install express-validator
// npm install nodemon
// npm install mysql2
// npm install sequelize
//npm install bcryptjs
//npm install dotenv
//npm install morgan


//Folder Structure //
// server.js
//app.js ===> start app
// config // DB ===> connection
// Controller
// Model
// Route
// Middleware
// utils / validator


import express  from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

// route error
import ApiError  from './utils/apiError.js';
import  globalError  from './middleware/errorMiddleware.js';

// route
import userRoute from './route/users/userRoute.js';
import postRoute from './route/posts/postRoute.js';
import commentRoute from './route/comments/commentRoute.js';

//auth route
import loginRoute from './route/auth/login/loginRoute.js'
import logoutRoute from './route/auth/logout/logoutRoute.js'

// Load environment variables from .env file
dotenv.config({ path: 'config.env' });


//Express app
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Node environment: ${process.env.NODE_ENV}`);
}



//Mount Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);

//auth Mount Routes
app.use('/api/v1/login', loginRoute);
app.use('/api/v1/logout', logoutRoute);




// Handling non-existent routes
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);



export default app;