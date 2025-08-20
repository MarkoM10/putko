import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTrip, ITripRequest } from "../controllers/tripController";

const router = Router();

router.post("/trips", authMiddleware, (req, res) => {
  createTrip(req as ITripRequest, res);
});

export default router;
