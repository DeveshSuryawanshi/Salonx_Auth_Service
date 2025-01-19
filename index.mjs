import http from 'http';
import app from './src/app.mjs';  // Import the app defined in app.mjs
import config from './src/config/config.mjs'
import Logger from './src/config/logger.mjs';
import connectToMongoDB from './src/config/db/connection.mjs';

const PORT = config.app.port || 3000;
const server = http.createServer(app);

// Start the server
server.listen(PORT, async() => {
    try {
        await connectToMongoDB();
        Logger.info(`API Gateway running on http://localhost:${PORT}`);
    } catch (error) {
        Logger.error("Error starting server: ", error);
    }
});

// Handle unhandled rejections or exceptions
process.on('unhandledRejection', (err) => {
  Logger.error('Unhandled rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  Logger.error('Uncaught exception:', err);
  process.exit(1);
});
