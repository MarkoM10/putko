import axios from "axios";
import { IAddToFavoritesResponse } from "../interfaces/interfaces";

export const addToFavoritesService = async (
  token: string | null,
  trip_id: number | null,
  alias: string
): Promise<IAddToFavoritesResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/favorites",
      { trip_id, alias },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { success, message } = response.data;

    return {
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Greška pri generisanju PDF-a.",
    };
  }
};
