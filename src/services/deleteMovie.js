import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const deleteMovie = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error;
    }
}