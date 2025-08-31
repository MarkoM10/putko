import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import tripRoutes from "./routes/tripRoutes";
import reportRoutes from "./routes/reportRoutes";
import path from "path";
import favoritesRoutes from "./routes/favoritesRoutes";

const app = express();

app.use(
  "/reports/files",
  express.static(path.resolve(__dirname, "../reports/files"))
);

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", tripRoutes);
app.use("/", reportRoutes);
app.use("/", favoritesRoutes);

export default app;
