import { Router } from "express";
import { signUp, login } from "../controllers/authController";
// import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);

// router.get("/me", authenticate, (req, res) => {
//   res.json({ message: "Ovo je zaštićena ruta", user: req.user });
// });

export default router;
