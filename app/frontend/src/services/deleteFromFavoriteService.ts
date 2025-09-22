import axios from "axios";

export const deleteFromFavoritesService = async (
  token: string | null,
  trip_id: number | null
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.delete("http://localhost:5000/favorites", {
      headers: { Authorization: `Bearer ${token}` },
      data: { trip_id },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Greška pri uklanjanju iz omiljenih.",
    };
  }
};
