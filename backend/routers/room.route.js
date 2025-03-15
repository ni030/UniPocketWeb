import { Router } from "express";
import { roomController } from "../controllers/room-controller.js";

export const roomRouter = Router();

roomRouter.get("/", roomController.getAllRooms);