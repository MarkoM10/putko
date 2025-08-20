import { Response, Request } from "express";
import { PrismaClient } from "../generated/prisma";
import axios from "axios";
import { config } from "../config/config";

const prisma = new PrismaClient();

export interface ITripRequest extends Request {
  user?: number | any;
  origin: string;
  destination: string;
  fuel_consumption: number;
  fuel_price: number;
  passengers: number;
  is_round_trip: boolean;
  tolls: number;
}

const fetchDistance = async (
  origin: string,
  destination: string
): Promise<number> => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?departure_time=now&destinations=${destination}&origins=${origin}&key=${config.googleMapsApiKey}`;
  const response = await axios.get(url);

  if (response.data.rows[0].elements[0].status !== "OK") {
    throw new Error("Unable to fetch distance from Google API");
  }

  return response.data.rows[0].elements[0].distance.value / 1000;
};

export const createTrip = async (
  req: ITripRequest,
  res: Response
): Promise<any> => {
  try {
    const {
      origin,
      destination,
      fuel_consumption,
      fuel_price,
      passengers,
      is_round_trip,
      tolls,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const distance_km = await fetchDistance(origin, destination);

    const effectiveDistance = is_round_trip ? distance_km * 2 : distance_km;

    const total_cost = Math.round(
      (effectiveDistance / 100) *
        Number(fuel_consumption) *
        Number(fuel_price) +
        (tolls ? Number(tolls) : 0)
    );
    const cost_per_person = Math.round(total_cost / Number(passengers));

    const trip = await prisma.trips.create({
      data: {
        user_id: req.user.id,
        origin,
        destination,
        distance_km,
        fuel_consumption,
        fuel_price,
        tolls,
        passengers,
        is_round_trip: is_round_trip === 1 ? true : false,
        total_cost,
        cost_per_person,
      },
    });

    return res
      .status(201)
      .json({ message: "Uspešno ste kreirali putovanje!", trip });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Greška pri kreiranju putovanja" });
  }
};
