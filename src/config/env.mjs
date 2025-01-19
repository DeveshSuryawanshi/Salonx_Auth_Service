import dotenv from "dotenv";
dotenv.config();

const ENV = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: process.env.PORT || 3000, // Fallback to 3000 if not set
    // MongoDB URI (recommended approach)
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
    // if you need to use authentication (optional)
    MONGODB_USER: process.env.MONGODB_USER || "admin",
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || "password",
    MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
    MONGODB_PORT: process.env.MONGODB_PORT || 27017,
    MONGODB_NAME: process.env.MONGODB_NAME || "myDatabase",
    // if you want to use MySQL
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 3306,
    DB_NAME: process.env.DB_NAME || "myapp",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    // JWT secret key (required)
    JWT_SECRET: process.env.JWT_SECRET || "default_jwt_secret",
    // Other environment variables
    SESSION_SECRET: process.env.SESSION_SECRET,
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    LOG_FILE: process.env.LOG_FILE || "app.log",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

export default ENV;