import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

// Initialize required imports
config();
const app = express();

// Middleware
app.use(express.json());

// DEV Middlware, remove in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;