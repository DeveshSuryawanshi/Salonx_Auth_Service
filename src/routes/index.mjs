import express from 'express';
import validateJWT from '../utils/jwtValidation.mjs';
import config from "../config/config.mjs";

const router = express.Router();


// Validate JWT for all routes
router.use((req, res, next) => {
    const openRoutes = [config.open_route.login, config.open_route.register];
    if (openRoutes.includes(req.path)) {
        return next(); // Skip JWT validation for public routes
    }
    validateJWT(req, res, next);
});

export default router;
