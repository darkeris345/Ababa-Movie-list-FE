import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL_AUTH = import.meta.env.VITE_AUTH_API_URL;

export const useRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const registerUser = async ({ username, password }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_URL_AUTH}/register`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      const data = response.data;

      if (response.status !== 200) {
        setError(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      setError("An error occurred during registration.");
      toast.error("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, error };
};
