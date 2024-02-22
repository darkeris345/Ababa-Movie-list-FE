import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const API_URL_AUTH = import.meta.env.VITE_AUTH_API_URL;

export const useLogin = () => {
  const context = useContext(AuthContext);
  const { dispatch } = context;
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const loginUser = async ({ username, password }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_URL_AUTH}/login`,
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

      toast.success("Login successful");
      setTimeout(() => {
        navigate("/movies");
      }, 2000);

      const data = response.data;

      if (response.status !== 200) {
        setError(data.error);
        toast.error(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
      }
    } catch (error) {
      setError("An error occurred during registration.");
      toast.error("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};