import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { Logger, setTenantToStore, tenantDBConnection, errorHandler, configureCorsPolicy, requestLogger } from "@DeveshSuryawanshi/salonx_infra_service";
import router from "./routes/main.routes.mjs";
import connection from './config/db/connection.mjs';

const app = express();

// Middleware setup
app.use(connection);
app.use(tenantDBConnection); // Attach tenant and database connection to the request
app.use(setTenantToStore);
app.use(configureCorsPolicy); // Enable Cross-Origin Resource Sharing
app.use(requestLogger); // Log HTTP requests
app.use(helmet()); // Security Middleware
app.use(morgan('combined')); // Log HTTP requests
app.use(bodyParser.json());

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

app.use(errorHandler);

export default app;
