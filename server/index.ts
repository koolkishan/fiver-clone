import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./routes/AuthRoutes";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes";
import { orderRoutes } from "./routes/OrderRoutes";

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
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
