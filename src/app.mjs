import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Logger from "./config/logger.mjs";
import router from "./routes/index.mjs";
import requestLogger from './src/middlewares/requestLogger.middleware.mjs';
import crossOriginControl from './middlewares/crossOriginControl.middleware.mjs';
import errorMiddleware from "./middlewares/error.middleware.mjs";

const app = express();

// Middleware setup
app.use(crossOriginControl); // Enable Cross-Origin Resource Sharing
app.use(requestLogger); // Log HTTP requests
app.use(helmet()); // Security Middleware
app.use(morgan('combined')); // Log HTTP requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Gateway Routes
app.use('/', router);

// Fallback for unmatched routes
app.use((req, res) => {
    Logger.warn(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Route not found' });
});

// Error Handling
app.use((err, req, res, next) => {
    Logger.error(`Error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use(errorMiddleware);

export default app;
