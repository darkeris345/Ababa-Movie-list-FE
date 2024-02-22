import axios from "axios";

const API_URL_AUTH = import.meta.env.VITE_AUTH_API_URL;

export const updateData = async (userId, data) => {
  try {
    const response = await axios.patch(`${API_URL_AUTH}/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteMovieFromFavorites = async (userId, movieId) => {
  try {
    const response = await axios.patch(`${API_URL_AUTH}/${userId}/${movieId}`, {
      $pull: { favouriteListes: movieId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting movie from favorites:", error);
    throw error;
  }
};
