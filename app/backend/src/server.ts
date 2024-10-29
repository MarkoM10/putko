import { Request, Response } from "express";
import cors from "cors";
import { QueryParams } from "./interfaces/interfaces";
import dotenv from "dotenv";

const express = require("express");
const app = express();
const axios = require("axios");
app.use(cors());

dotenv.config();
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const PORT = process.env.PORT;

app.get(
  "/distance",
  async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        error: "Both origin and destination coordinates are required.",
      });
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=${destination}&origins=${origin}&key=${googleMapsApiKey}`;

    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching distance data" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
