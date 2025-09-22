import axios from "axios";

export const deleteTripService = async (
  token: string | null,
  tripId: number | null
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/trips/${tripId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Greška pri brisanju putovanja.",
    };
  }
};
