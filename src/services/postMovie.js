import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postMovie = async (data) => {
  console.log(data);
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const formattedData = {
      ...data,
      Year: Number(data.Year),
      Runtime: Number(data.Runtime),
    };
    const response = await axios.post(API_URL, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
