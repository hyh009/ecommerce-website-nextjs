import axios from "axios";

// "https://ecommerce-website-nextjs.vercel.app"

export const baseUrl = process.env.NODE_ENV!=="production"? "http://localhost:3000":"https://hsinyaonextshop.netlify.app/";

export const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

