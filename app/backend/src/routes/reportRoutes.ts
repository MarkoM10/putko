import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createReport, getReports } from "../controllers/reportController";

const router = Router();

router.post("/reports", authMiddleware, (req, res) => {
  createReport(req, res);
});

router.get("/reports", authMiddleware, (req, res) => {
  getReports(req, res);
});

export default router;
