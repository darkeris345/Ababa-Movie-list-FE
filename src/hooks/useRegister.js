import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL_AUTH = import.meta.env.VITE_AUTH_API_URL;
const passMessage = "Password must be 8+ characters with at least one symbol.";
// eslint-disable-next-line no-useless-escape
const regex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~/-])(?=.*[a-zA-Z]).{8,}$/;

export const useRegister = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        return;
      } else if (!regex.test(password)) {
        setError(passMessage);
        toast.error(passMessage);
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
        setError(data.error || "An error occurred during registration.");
        toast.error(data.error || "An error occurred during registration.");
      }
    } catch (error) {
      console.error(error.message);
      setError("An error occurred during registration.");
      toast.error("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading, error };
};
