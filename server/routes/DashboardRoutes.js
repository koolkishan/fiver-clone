import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getSellerData } from "../controllers/DashboardController.js";

export const dashboardRoutes = Router();

dashboardRoutes.get("/seller", verifyToken, getSellerData);
