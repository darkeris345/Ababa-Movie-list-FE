import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateMovie = async (_id, data) => {
    try {
        const response = await axios.patch(`${API_URL}/${_id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error;
    }
}