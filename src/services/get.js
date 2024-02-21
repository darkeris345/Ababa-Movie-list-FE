import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getOne = async (_id) => {
  const response = await axios.get(`${API_URL}/${_id}`);
  return response.data;
};

export const getAllDataPaginated = async (page, count) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token is null. User may not be logged in.');

    return { data: null, totalCount: 0 };
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await axios.get(
      `${API_URL}?_page=${page}&_per_page=${count}`
    );
    console.log('Response:', response.data);
    return { data: response.data, totalCount: response.headers["x-total-count"] };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};