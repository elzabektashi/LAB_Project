import { Router } from "express";
import { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver, } from "../controllers/driversController.js";
const router = Router();
router.get("/", getAllDrivers);
router.get("/:id", getDriverById);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);
export default router;
