import { Router } from "express";
import { login, signup, socialLogin } from "../controllers/AuthControllers";

export const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/social-login", socialLogin);
