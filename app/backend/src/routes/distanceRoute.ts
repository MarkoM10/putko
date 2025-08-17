import { Router } from "express";
import { getDistance } from "../controllers/distanceController";

const router = Router();

router.get("/distance", getDistance);

export default router;
