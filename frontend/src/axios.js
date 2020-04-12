import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";
const token = localStorage.getItem("authToken") || "";

const customAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default customAxios;
