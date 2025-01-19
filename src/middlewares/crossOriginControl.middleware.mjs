import cors from 'cors';
import config from '../config/config.mjs';

// Allowed origins
const allowedOrigins = [config.cors.origin,]; // Add your allowed origins here

// CORS middleware
const crossOriginControl = cors({
    origin: (origin, callback) => {
        // Allow requests without `Origin` header (e.g., Postman/Thunder Client)
        
        if (!origin) {
          if(config.app.nodeEnv !== 'development'){
            return callback(new Error('Not allowed by CORS'), false);
          }
          return callback(null, true); // Allow non-browser requests
        }

        // Validate the origin
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Reject disallowed origins
        return callback(new Error('Not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Include credentials
});

export default crossOriginControl;
