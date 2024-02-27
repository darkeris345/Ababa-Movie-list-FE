import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const postMovie = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};
