import axios from "axios";

export const getFavoritesService = async (token: string | null) => {
  const response = await axios.get("http://localhost:5000/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
