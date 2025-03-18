import "dotenv/config";
import cors from "cors";
import express from "express";
import { PORT } from "./config/env.js";
import { router } from "./routers/index.js";
import { clerkMiddleware } from "@clerk/express";
import { requireAuth } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.use("/api/v1", requireAuth, router);

app.listen(PORT || "5200", () => {
  console.log("Server is running on port 5200");
});
