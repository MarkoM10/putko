import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import tripRoutes from "./routes/tripRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", tripRoutes);
export default app;
