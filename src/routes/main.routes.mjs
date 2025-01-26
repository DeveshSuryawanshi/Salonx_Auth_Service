import express from 'express';
import { validateRequest } from '@DeveshSuryawanshi/salonx_infra_service';
import { config }  from "@DeveshSuryawanshi/salonx_infra_service";
import authRouter from './authRoutes/auth.routes.mjs';

const router = express.Router();

// Validate JWT for all routes
router.use(async(req, res, next) => {
    const openRoutes = config.open_route.routes || [];
    if (openRoutes.includes(req.path)) {
        return next(); // Skip validation for public routes
    }
    await validateRequest(req, res, next);
});

router.use("/v1/api", authRouter);

export default router;
