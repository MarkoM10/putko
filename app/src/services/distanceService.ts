import axios from "axios";
export const fetchDistance = async (origin: string, destination: string) => {
  const response = await axios.get("http://localhost:5000/distance", {
    params: { origin, destination },
  });

  const { data } = response;

  return data;
};
