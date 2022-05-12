import axios from "axios";

export const baseUrl = process.env.NODE_ENV!=="production"? "http://localhost:3000":"";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

