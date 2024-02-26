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

      if (
        !username ||
        !password ||
        username.trim() === "" ||
        password.trim() === ""
      ) {
        setError("Username and password are required");
        toast.error("Username and password are required");
      }

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
        setIsLoading(false);
        setError(data.message);
        toast.error(data.message);
      } else {
        localStorage.setItem("perPage", 4);
        localStorage.setItem("page", 1);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        window.location.reload();
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError("Incorrect username or password");
        toast.error("Incorrect username or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
};
