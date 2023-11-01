import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

// Initialize required imports
config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// DEV Middlware, remove in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;