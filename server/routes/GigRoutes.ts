import { Router } from "express";
import { addGig } from "../controllers/GigsController";
import multer from "multer";
import { verifyToken } from "../middlewares/AuthMiddleware";

const upload = multer({ dest: "uploads/" });

export const gigRoutes = Router();

gigRoutes.post("/add", verifyToken, upload.array("images"), addGig);
