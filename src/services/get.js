import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const API_URL_AUTH = import.meta.env.VITE_AUTH_API_URL;

export const getOne = async (_id) => {
  const response = await axios.get(`${API_URL}/${_id}`);
  return response.data;
};

export const getAllDataPaginated = async (page, count) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { data: null, totalCount: 0 };
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(
      `${API_URL}?_page=${page}&_per_page=${count}`
    );
    return {
      data: response.data,
      totalCount: response.headers["x-total-count"],
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Getting favourite list
export const getFavouriteMovies = async (userId) => {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios.get(`${API_URL_AUTH}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting favourite movies:", error);
    throw error;
  }
};
