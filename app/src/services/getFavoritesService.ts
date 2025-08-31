import axios from "axios";

export const getFavoritesService = async (token: string | null) => {
  const response = await axios.get("http://localhost:5000/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(response.data, "test");

  return response.data;
};
