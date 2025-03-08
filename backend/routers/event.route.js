import { Router } from "express";
import { eventController } from "../controllers/event-controller.js";

export const eventRouter = Router();

eventRouter.get("/", eventController.getEvents);
eventRouter.post("/", eventController.createEvent);
