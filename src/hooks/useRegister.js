import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL_AUTH = import.meta.env.VITE_AUTH_API_URL;
const passMessage = "Password must be 8+ characters with at least one symbol.";

export const useRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const registerUser = async ({ username, password }) => {
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
        setIsLoading(true);
        return;
      } else if (
        // eslint-disable-next-line no-useless-escape
        !/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[a-zA-Z]).{8,}$/.test(
          password
        )
      ) {
        setError(passMessage);
        toast.error(passMessage);
        setIsLoading(true);
        return;
      }

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

      const data = response.data;

      if (response.status === 201) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (data.error.includes("username")) {
          setError(
            "Username already exists. Please choose a different username."
          );
          toast.error(
            "Username already exists. Please choose a different username."
          );
        } else {
          setError(data.error);
        }
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, error };
};
