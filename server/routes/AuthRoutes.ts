import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthControllers";
import { verifyToken } from "../middlewares/AuthMiddleware";

export const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/get-user-info", verifyToken, getUserInfo);
