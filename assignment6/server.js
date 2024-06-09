import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './config/DB/connection.js';



// Load environment variables from .env file
dotenv.config({ path: 'config.env' });


//DB connection
sequelize.sync()


//listen on port 8000
const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('The server is shutting down...');
        process.exit(1);
    });
});