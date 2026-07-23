import axios from "axios";
import toast from "react-hot-toast";

import {
  getAccessToken,
  removeTokens,
} from "../services/tokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(

  (config) => {

    const token = getAccessToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }

);

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      removeTokens();

      window.location.href = "/login";

    }

    if (
      error.response?.status >= 500
    ) {

      toast.error(
        "Internal server error."
      );

    }

    return Promise.reject(error);

  }

);

export default api;
