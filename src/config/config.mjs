import ENV from "./env.mjs";

const config = {
    app: {
        port: ENV.PORT,
        nodeEnv: ENV.NODE_ENV,
    },
    mongoDB: {
        uri: ENV.MONGODB_URI,
        user: ENV.MONGODB_USER,
        password: ENV.MONGODB_PASSWORD,
        host: ENV.MONGODB_HOST,
        port: ENV.MONGODB_PORT,
        name: ENV.MONGODB_NAME,
    },
    mysql: {
        host: ENV.DB_HOST,
        port: ENV.DB_PORT,
        name: ENV.DB_NAME,
        user: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
    },
    jwt: {
        secret: ENV.JWT_SECRET,
    },
    session: {
        secret: ENV.SESSION_SECRET,
    },
    log: {
        level: ENV.LOG_LEVEL,
        file: ENV.LOG_FILE,
    },
    cors: {
        origin: ENV.CORS_ORIGIN,
    },
    smtp: {
        host: ENV.SMTP_HOST,
        user: ENV.SMTP_USER,
        password: ENV.SMTP_PASSWORD,
    },
};

export default config;