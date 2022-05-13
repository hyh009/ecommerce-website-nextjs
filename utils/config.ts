import axios from "axios";


export const baseUrl = process.env.NODE_ENV!=="production"? "http://localhost:3000":"https://ecommerce-website-nextjs.vercel.app";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

