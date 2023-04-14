import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./routes/AuthRoutes";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
