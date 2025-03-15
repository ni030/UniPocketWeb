import { Router } from "express";
import { meritController } from "../controllers/merit-controller.js";

export const meritRouter = Router();

meritRouter.get("/", meritController.getAllMerits);