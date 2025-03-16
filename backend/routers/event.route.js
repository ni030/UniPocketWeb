import { Router } from "express";
import { eventController } from "../controllers/event-controller.js";

export const eventRouter = Router();

eventRouter.get("/", eventController.getEvents);
eventRouter.get("/:eventId", eventController.getEventById);
eventRouter.post("/", eventController.createEvent);
eventRouter.put("/:eventId", eventController.updateEvent);
eventRouter.delete("/:eventId", eventController.deleteEvent);
