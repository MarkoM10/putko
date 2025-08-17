import dotenv from "dotenv";
dotenv.config();

export const config = {
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  port: process.env.PORT || 3000,
};
