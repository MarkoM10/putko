import { Request, Response } from "express";
import axios from "axios";
import { config } from "../config/config";

export const getDistance = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({
      error: "Both origin and destination coordinates are required.",
    });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=${destination}&origins=${origin}&key=${config.googleMapsApiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching distance data" });
  }
};
