import express from 'express';
// import validateJWT from '../utils/jwtValidation.mjs';
import { config }  from "@DeveshSuryawanshi/salonx_infra_service";
import authRouter from './authRoutes/auth.routes.mjs';

const router = express.Router();

// Validate JWT for all routes
router.use((req, res, next) => {
    
    const openRoutes = config.open_route.routes || [];
    if (openRoutes.includes(req.path)) {
        console.log(req.path);
        return next(); // Skip JWT validation for public routes
    }
    validateJWT(req, res, next);
});

router.use("/v1/api", authRouter);

export default router;
