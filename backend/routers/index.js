import { Router } from "express";
import { userRouter } from "./user.route.js";
import { eventRouter } from "./event.route.js";
import { complaintRouter } from "./complaint.route.js";

export const router = Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/complaints", complaintRouter);
