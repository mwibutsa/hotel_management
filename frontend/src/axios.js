import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

dotenv.config();

const baseUrl = "/api";
const devUrl = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("accessToken") || "";

const customAxios = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? devUrl : baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default customAxios;
