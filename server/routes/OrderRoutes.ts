import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware";
import { confirmOrder, createOrder } from "../controllers/OrdersControllers";

export const orderRoutes = Router();

orderRoutes.post("/create", verifyToken, createOrder);
orderRoutes.put("/success", verifyToken, confirmOrder);
