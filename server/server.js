import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";

import projectsRouter from "./routes/projects.js";
import contactRouter from "./routes/contact.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// B7
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: corsOrigin }));

app.use(express.json());

// B1
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactRouter);

// B6
app.use(notFoundHandler);
app.use(errorHandler);

// B1/B7
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});