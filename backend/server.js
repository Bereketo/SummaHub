const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const connectDB = require('./config/db.js'); 
connectDB(); 

const app = require('./app');
const port = process.env.PORT;

// Start the server
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.error(err.name, err.message);
    console.error('UNHANDLED REJECTION! 🔥 Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});
