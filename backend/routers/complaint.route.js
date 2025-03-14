import { Router } from "express";
import { complaintController } from "../controllers/complaint-controller.js";

export const complaintRouter = Router();

complaintRouter.get("/", complaintController.getAllComplaints);
