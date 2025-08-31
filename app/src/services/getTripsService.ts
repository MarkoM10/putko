import axios from "axios";

export const getTripsService = async (token: string | null) => {
  try {
    const response = await axios.get("http://localhost:5000/trips", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { trips } = response.data;

    return { success: true, trips };
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
      message: "Došlo je do greške prilikom izlistavanja.",
    };
  }
};
