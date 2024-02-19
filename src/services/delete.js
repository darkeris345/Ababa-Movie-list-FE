import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import {getOne} from "./get";

export const deleteData = async (_id) => {
  const { firstName, lastName } = await getOne(_id);
  const confirm = window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`);
  if (!confirm) return;
  const deleteResponse = await axios.delete(`${API_URL}/${_id}`);
  return deleteResponse.data;
};
