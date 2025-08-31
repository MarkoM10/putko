import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  IFavoritesRequest,
} from "../controllers/favoritesController";

const router = Router();

router.post("/favorites", authMiddleware, (req, res) => {
  createFavorite(req as IFavoritesRequest, res);
});

router.get("/favorites", authMiddleware, (req, res) => {
  getFavorites(req as IFavoritesRequest, res);
});

router.delete("/favorites", authMiddleware, (req, res) => {
  deleteFavorite(req as IFavoritesRequest, res);
});

export default router;
