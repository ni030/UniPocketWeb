import { Router } from "express";
import { facilityController } from "../controllers/facility-controller.js";

export const facilityRouter = Router();

facilityRouter.get("/", facilityController.getAllFacilities);
facilityRouter.get("/:facilityId", facilityController.getFacilityById);
facilityRouter.put("/:facilityId", facilityController.updateFacility);
facilityRouter.delete("/:facilityId", facilityController.deleteFacility);
facilityRouter.post("/", facilityController.createFacility);
