import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getOne = async (_id) => {
  const response = await axios.get(`${API_URL}/${_id}`);
  return response.data;
};

export const getAllDataPaginated = async (page, count) => {
  const response = await axios.get(
    `${API_URL}?_page=${page}&_per_page=${count}`
  );
  return { data: response.data, totalCount: response.headers["x-total-count"] };
};
