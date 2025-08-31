import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createTrip,
  deleteTrip,
  getTrips,
  IGetTripsRequest,
  ITripRequest,
} from "../controllers/tripController";

const router = Router();

router.post("/trips", authMiddleware, (req, res) => {
  createTrip(req as ITripRequest, res);
});

router.get("/trips", authMiddleware, (req, res) => {
  getTrips(req as IGetTripsRequest, res);
});

router.delete("/trips/:id", authMiddleware, (req, res) => {
  deleteTrip(req as IGetTripsRequest, res);
});

export default router;
