import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateMovie = async (_id, data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { data: null, totalCount: 0 };
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const formattedData = {
      ...data,
      Year: Number(data.Year),
      Runtime: Number(data.Runtime),
    }
    const response = await axios.patch(`${API_URL}/${_id}`, formattedData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating movie:", error);
  }
};
