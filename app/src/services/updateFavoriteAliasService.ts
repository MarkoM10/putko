import axios from "axios";

export const updateFavoriteAliasService = async (
  token: string | null,
  id: number,
  alias: string
): Promise<{ success: boolean }> => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/favorites/${id}`,
      { alias },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Greška pri ažuriranju aliasa:", error);
    return { success: false };
  }
};
