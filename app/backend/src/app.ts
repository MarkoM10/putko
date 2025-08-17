import express from "express";
import cors from "cors";
import distanceRoute from "./routes/distanceRoute";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", distanceRoute);
app.use("/", authRoutes);

export default app;
