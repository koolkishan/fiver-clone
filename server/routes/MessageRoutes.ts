import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware";
import { addMessage, getMessages } from "../controllers/MessageControllers";

export const messageRoutes = Router();

messageRoutes.post("/add-message/:orderId", verifyToken, addMessage);
messageRoutes.get("/get-messages/:orderId", verifyToken, getMessages);
