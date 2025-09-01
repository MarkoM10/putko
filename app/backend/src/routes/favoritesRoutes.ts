import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  IFavoritesRequest,
  updateFavoriteAlias,
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

router.patch("/favorites/:id", authMiddleware, updateFavoriteAlias);

export default router;
