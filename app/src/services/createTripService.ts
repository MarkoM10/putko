import axios from "axios";
import { ITripData } from "../interfaces/interfaces";

export const createTripService = async (
  tripData: ITripData,
  token: string | null
) => {
  try {
    console.log(tripData);

    const response = await axios.post("http://localhost:5000/trips", tripData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { message, trip } = response.data;

    return { success: true, message, trip };
  } catch (error: any) {
    const { data } = error.response;

    if (error.response && data && data.message) {
      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: false,
      message: "Došlo je do greške prilikom kreiranja putovanja.",
    };
  }
};
