import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware";
import { getSellerData } from "../controllers/DashboardController";

export const dashboardRoutes = Router();

dashboardRoutes.get("/seller", verifyToken, getSellerData);
